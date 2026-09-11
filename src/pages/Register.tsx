import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Register: React.FC = () => {
  useDocumentTitle('Registracija');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    login({ id: Date.now().toString(), name, email });
    navigate('/profil');
  };

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: '2rem auto', padding: '2.5rem', backgroundColor: 'var(--green-card)', borderRadius: '16px', textAlign: 'center' }}>
      <h2>Registracija naloga</h2>
      <p style={{ fontSize: '0.9rem', color: '#6b5b52' }}>Kreirajte novi nalog za praćenje porudžbina.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <InputField label="Ime i prezime" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField label="Lozinka" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Registruj se</Button>
      </form>

      <p style={{ marginTop: '1.5rem' }}>
        Već imate nalog? <Link to="/prijava" style={{ color: '#2c5e3b', fontWeight: 'bold' }}>Prijavite se</Link>
      </p>
    </div>
  );
};