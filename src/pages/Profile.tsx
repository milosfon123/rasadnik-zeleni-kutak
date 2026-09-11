import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  useDocumentTitle('Korisnički profil');
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);

 useEffect(() => {
    if (user?.email) {
      const savedOrders = JSON.parse(localStorage.getItem(`user_orders_${user.email}`) || '[]');
      setOrders(savedOrders);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/prijava');
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Niste prijavljeni.</p>
        <button onClick={() => navigate('/prijava')} style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', backgroundColor: '#2c5e3b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Prijavite se</button>
      </div>
    );
  }

  return (
    <div className="profile-container" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2.5rem', backgroundColor: 'var(--green-card)', borderRadius: '16px' }}>
      <h2>Korisnički nalog 👤</h2>
      <div style={{ backgroundColor: '#e8e2d5', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem' }}>
        <p style={{ margin: '0 0 0.8rem 0' }}><strong>Ime:</strong> {user.name}</p>
        <p style={{ margin: 0 }}><strong>Email:</strong> {user.email}</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Istorija porudžbina 📦</h3>
        {orders.length === 0 ? (
          <p style={{ fontSize: '0.9rem', color: '#6b5b52' }}>Nemate prethodnih porudžbina.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {orders.map((order) => (
              <div key={order.id} style={{ backgroundColor: '#e8e2d5', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', color: '#4a3b32' }}>Datum: {order.date}</span>
                  <span style={{ fontWeight: 'bold', color: '#2c5e3b' }}>{order.total} RSD</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#6b5b52' }}>
                  {order.items.map((item: any, idx: number) => (
                    <li key={idx}>
                      {item.plant.name} (količina: {item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleLogout} style={{ marginTop: '2rem', backgroundColor: '#a94442', color: 'white', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
        Odjavi se
      </button>
    </div>
  );
};