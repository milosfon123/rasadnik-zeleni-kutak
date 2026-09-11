import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { Toast } from '../components/Toast';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setToast({ message: 'Sva polja su obavezna!', type: 'error' });
      return false;
    }
    if (password.length < 6) {
      setToast({ message: 'Lozinka mora imati najmanje 6 karaktera!', type: 'error' });
      return false;
    }
    if (password !== confirmPassword) {
      setToast({ message: 'Lozinke se ne poklapaju!', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setToast({ message: 'Uspešna registracija! Možete se prijaviti.', type: 'success' });
    
    setTimeout(() => {
      navigate('/prijava');
    }, 1500);
  };

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Registracija 📝</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputField 
          label="Ime i prezime" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
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
        <InputField 
          label="Potvrdi lozinku" 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <Button variant="primary" type="submit">Registruj se</Button>
      </form>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};