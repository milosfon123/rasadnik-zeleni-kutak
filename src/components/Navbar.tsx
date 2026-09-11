import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { user, cart } = useApp();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Rasadnik Zeleni Kutak 🌿
      </Link>
      <div className="navbar-links">
        <Link to="/katalog">Katalog</Link>
        
        {/* Prikazuj ove linkove samo ako je korisnik ulogovan */}
        {user && (
          <>
            <Link to="/plan-sadnje">Plan Sadnje</Link>
            <Link to="/omiljene">Omiljene</Link>
            <Link to="/korpa">
              Korpa {totalCartItems > 0 && `(${totalCartItems})`}
            </Link>
          </>
        )}
        
        {user ? (
          <Link to="/profil" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            Profil ({user.name.split(' ')[0]})
          </Link>
        ) : (
          <Link to="/prijava">Prijava</Link>
        )}
      </div>
    </nav>
  );
};