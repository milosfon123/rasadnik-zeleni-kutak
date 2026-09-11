import React, { useState } from 'react';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login({ id: '1', name: 'Miloš', email });
      alert('Uspešno ste se prijavili!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Prijava na nalog 🌿</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="E-mail adresa"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vaš.email@example.com"
            required
          />
          <InputField
            label="Lozinka"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
            Prijavi se
          </Button>
        </form>
        <p className="auth-footer">
          Nemate nalog? <a href="/registracija">Registrujte se</a>
        </p>
      </div>
    </div>
  );
};