import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Home: React.FC = () => {
  useDocumentTitle('Početna');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/katalog?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/katalog');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/katalog?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="home-container" style={{ padding: '1rem 2rem 2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Glavni baner sa traženom bojom #8FBC8F */}
      <div 
        style={{
          backgroundColor: '#8FBC8F',
          borderRadius: '16px',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: '#4a3b32',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          marginBottom: '2rem'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
          Vaša zelena oaza na jednom mestu
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
          Pretražite bazu biljaka i uredite svoj vrt
        </p>

        <form onSubmit={handleSearch} style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="Unesite naziv biljke (npr. Monstera)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              borderRadius: '30px',
              border: 'none',
              backgroundColor: '#f7f3ec',
              color: '#4a3b32',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              boxSizing: 'border-box'
            }}
          />
        </form>
      </div>

      {/* Istaknute kategorije blizu gornjeg dela */}
      <h3 style={{ marginBottom: '1rem', color: '#4a3b32' }}>
        Istaknute kategorije i sezonske preporuke:
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {[
          { title: 'Ukrasno bilje', category: 'ukrasno' },
          { title: 'Začinsko bilje', category: 'zacinsko' },
          { title: 'Voćne sadnice', category: 'vocne' }
        ].map((item) => (
          <div
            key={item.category}
            onClick={() => handleCategoryClick(item.category)}
            style={{
              backgroundColor: '#8FBC8F',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '16px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div 
              style={{
                backgroundColor: '#e8e2d5',
                borderRadius: '12px',
                height: '100px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}
            >
              🌿
            </div>
            <h4 style={{ color: '#4a3b32', fontSize: '1.2rem', margin: 0 }}>{item.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};