import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { Toast } from '../components/Toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const { login } = useApp();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setToast({ message: 'Sva polja su obavezna!', type: 'error' });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToast({ message: 'Unesite validnu email adresu!', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Prijavljujemo korisnika bez polja 'role'
    login({ id: '1', name: 'Petar Petrović', email });
    setToast({ message: 'Uspešna prijava!', type: 'success' });
    
    setTimeout(() => {
      navigate('/katalog');
    }, 1000);
  };

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Prijava 🔐</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputField 
          label="Email adresa" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <InputField 
          label="Lozinka" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button variant="primary" type="submit">Prijavi se</Button>
      </form>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};