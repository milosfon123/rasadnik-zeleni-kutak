import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Dinamički uzimamo ime iz email-a (npr. milos iz milos@gmail.com) ili prosleđujemo nalog
    const userName = email.split('@')[0];
    login({ id: '1', name: userName.charAt(0).toUpperCase() + userName.slice(1), email });
    
    navigate('/profil');
  };

  return (
    <div className="form-container" style={{ maxWidth: '400px', textAlign: 'center' }}>
      <h2>Prijava naloga</h2>
      <p>Dobrodošli nazad! Prijavite se za pristup.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <InputField label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField label="Lozinka" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Prijavi se</Button>
      </form>
      
      <p style={{ marginTop: '1.5rem' }}>
        Nemate nalog? <Link to="/registracija" style={{ color: '#2c5e3b', fontWeight: 'bold' }}>Registruj se!</Link>
      </p>
    </div>
  );
};