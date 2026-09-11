import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useApp();
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  // Direktno izračunavanje ukupne cene
  const cartTotal = cart.reduce((total, item) => {
    const price = item.plant.discountPrice || item.plant.price;
    return total + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="cart-success">
        <h2>Uspešna porudžbina! 🎉</h2>
        <p>Vaša narudžbina je uspešno zabeležena. Hvala vam što kupujete u našem rasadniku!</p>
        <Button onClick={() => navigate('/katalog')}>Povratak na katalog</Button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Vaša Korpa 🛒</h2>

      {cart.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => {
              const currentPrice = item.plant.discountPrice || item.plant.price;
              return (
                <div key={item.plant.id} className="cart-item">
                  <img src={item.plant.image} alt={item.plant.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.plant.name}</h4>
                    <p>{currentPrice} RSD</p>
                  </div>
                  <div className="cart-quantity-controls">
                    <button onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="cart-item-subtotal">
                    <strong>{currentPrice * item.quantity} RSD</strong>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.plant.id)}>
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Ukupno za uplatu</h3>
            <div className="summary-row">
              <span>Ukupna cena:</span>
              <strong>{cartTotal} RSD</strong>
            </div>
            <div className="summary-row">
              <span>Dostava:</span>
              <span>Besplatna</span>
            </div>
            <hr />
            <Button variant="primary" onClick={handleCheckout}>
              Potvrdi Naručivanje 💳
            </Button>
            <Button variant="outline" onClick={clearCart}>
              Isprazni korpu
            </Button>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>Vaša korpa je trenutno prazna.</p>
          <Button onClick={() => navigate('/katalog')}>Idi u prodavnicu</Button>
        </div>
      )}
    </div>
  );
};