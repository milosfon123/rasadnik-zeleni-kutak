import React, { useState } from 'react';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Registracija je uspešna! Možete se prijaviti.');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Kreirajte nalog ✨</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Ime i prezime"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Petar Petrović"
            required
          />
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
            Registruj se
          </Button>
        </form>
        <p className="auth-footer">
          Već imate nalog? <a href="/prijava">Prijavite se</a>
        </p>
      </div>
    </div>
  );
};