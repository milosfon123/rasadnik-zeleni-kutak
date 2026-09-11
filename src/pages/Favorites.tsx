import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { plantService } from '../services/plantService';
import { PlantCard } from '../components/PlantCard';
import { useNavigate } from 'react-router-dom';
import type { Plant } from '../types/plant';

export const Favorites: React.FC = () => {
  useDocumentTitle('Omiljene Biljke');
  const { favorites, addToCart } = useApp();
  const navigate = useNavigate();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    plantService.getPlantsAsync().then((data) => {
      setPlants(data);
      setLoading(false);
    });
  }, []);

  const favoritePlants = plants.filter((p) => favorites.includes(p.id));

  return (
    <div className="favorites-container" style={{ maxWidth: '1000px', margin: '2rem auto', padding: '2rem', backgroundColor: 'var(--green-card)', borderRadius: '16px' }}>
      <h2>Vaše omiljene biljke ❤️</h2>

      {loading ? (
        <p>Učitavanje...</p>
      ) : favoritePlants.length === 0 ? (
        <p style={{ color: 'var(--text-dark)', marginTop: '1.5rem' }}>Nemate sačuvanih omiljenih biljaka.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {favoritePlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => navigate(`/katalog/${plant.id}`)}
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <PlantCard plant={plant} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};