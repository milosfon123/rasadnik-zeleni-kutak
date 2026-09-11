import React from 'react';
import { useApp } from '../context/AppContext';
import { plantService } from '../services/plantService';
import { PlantCard } from '../components/PlantCard';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const { favorites, addToCart } = useApp();
  const navigate = useNavigate();

  const favoritePlants = plantService.getAllPlants().filter((plant) =>
    favorites.includes(plant.id)
  );

  return (
    <div className="favorites-container">
      <h2>Omiljene Biljke ❤️</h2>

      {favoritePlants.length > 0 ? (
        <div className="plants-grid">
          {favoritePlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} onAddToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Trenutno nemate sačuvanih omiljenih biljaka.</p>
          <Button onClick={() => navigate('/katalog')}>Pregledaj katalog</Button>
        </div>
      )}
    </div>
  );
};