import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  useDocumentTitle('Korpa');
  const { cart, removeFromCart, updateQuantity, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + (item.plant.discountPrice || item.plant.price) * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0 || !user) return;

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('sr-RS'),
      items: [...cart],
      total: totalPrice
    };

    // Ključ zavisi od email-a ulogovanog korisnika
    const storageKey = `user_orders_${user.email}`;
    const existingOrders = JSON.parse(localStorage.getItem(storageKey) || '[]');
    localStorage.setItem(storageKey, JSON.stringify([newOrder, ...existingOrders]));

    clearCart();
    setOrderSuccess(true);
  };

  return (
    <div className="cart-container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', backgroundColor: 'var(--green-card)', borderRadius: '16px' }}>
      <h2>Vaša korpa 🛒</h2>

      {orderSuccess ? (
        <div style={{ backgroundColor: '#e8e2d5', padding: '2.5rem', borderRadius: '12px', textAlign: 'center', marginTop: '2rem' }}>
          <h3 style={{ color: '#2c5e3b', marginBottom: '0.8rem' }}>Hvala na kupovini! 🎉</h3>
          <p style={{ color: '#4a3b32', marginBottom: '1.5rem' }}>Vaša porudžbina je uspešno kreirana i sačuvana na vašem profilu.</p>
          <button 
            onClick={() => navigate('/profil')} 
            style={{ backgroundColor: '#2c5e3b', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Pogledaj istoriju na profilu
          </button>
        </div>
      ) : cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>Vaša korpa je trenutno prazna.</p>
          <button onClick={() => navigate('/katalog')} style={{ backgroundColor: '#2c5e3b', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Pogledajte katalog
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {cart.map((item) => {
              const price = item.plant.discountPrice || item.plant.price;
              return (
                <div key={item.plant.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e8e2d5', padding: '1rem', borderRadius: '12px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#4a3b32' }}>{item.plant.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b5b52' }}>Cena: {price} RSD</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button onClick={() => updateQuantity(item.plant.id, item.quantity - 1)} style={{ padding: '0.2rem 0.6rem' }}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.plant.id, item.quantity + 1)} style={{ padding: '0.2rem 0.6rem' }}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.plant.id)} style={{ backgroundColor: '#a94442', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}>Ukloni</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#4a3b32', margin: 0 }}>Ukupno: {totalPrice} RSD</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={clearCart} style={{ backgroundColor: 'transparent', border: '1px solid #4a3b32', color: '#4a3b32', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>Isprazni korpu</button>
              <button onClick={handleCheckout} style={{ backgroundColor: '#2c5e3b', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>Završi kupovinu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};