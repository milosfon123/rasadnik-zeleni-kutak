import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-container empty-state">
        <h2>Niste prijavljeni 🔒</h2>
        <p>Morate se prijaviti na vaš nalog da biste videli profil.</p>
        <Button onClick={() => navigate('/prijava')}>Prijavi se</Button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Moj Profil 👤</h2>

      <div className="profile-card">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-details">
          <h3>{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      <div className="profile-actions">
        <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>
          Odjavi se 🚪
        </Button>
      </div>
    </div>
  );
};