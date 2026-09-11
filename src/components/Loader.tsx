import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Učitavanje podataka...</p>
    </div>
  );
};