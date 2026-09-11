import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          🌿 Rasadnik <span>Zeleni Kutak</span>
        </a>
        <div className="navbar-links">
          <a href="/" className="nav-link">Početna</a>
          <a href="/katalog" className="nav-link">Katalog</a>
          <a href="/plan-sadnje" className="nav-link">Plan Sadnje</a>
          <a href="/omiljene" className="nav-link">Omiljene</a>
          <a href="/korpa" className="nav-link cart-link">
            Korpa 🛒
          </a>
          <a href="/prijava" className="nav-link">Prijava</a>
        </div>
      </div>
    </nav>
  );
};