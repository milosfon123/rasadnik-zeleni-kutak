import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { plantService } from '../services/plantService';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';

export const PlantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites } = useApp();

  const plant = id ? plantService.getPlantById(id) : undefined;

  if (!plant) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Biljka nije pronađena! 🌵</h2>
        <Button onClick={() => navigate('/katalog')}>Nazad na katalog</Button>
      </div>
    );
  }

  const isFav = favorites.includes(plant.id);

  return (
    <div className="plant-detail-container">
      <div className="plant-detail-image">
        <img src={plant.image} alt={plant.name} />
      </div>

      <div className="plant-detail-info">
        <span className="category-badge">{plant.category.toUpperCase()}</span>
        <h1>{plant.name}</h1>
        <p className="latin-name">{plant.latinName}</p>

        <div className="price-tag">
          {plant.discountPrice ? (
            <>
              <span className="price-old">{plant.price} RSD</span>
              <span className="price-current">{plant.discountPrice} RSD</span>
            </>
          ) : (
            <span className="price-current">{plant.price} RSD</span>
          )}
        </div>

        <p className="description">{plant.description}</p>

        <div className="care-instructions">
          <h3>Uslovi gajenja ☀️💧</h3>
          <ul>
            <li><strong>Svetlost:</strong> {plant.light}</li>
            <li><strong>Zalivanje:</strong> {plant.water}</li>
            <li><strong>Temperatura:</strong> {plant.temperature}</li>
          </ul>
        </div>

        <div className="action-buttons">
          <Button variant="primary" onClick={() => addToCart(plant)}>
            Dodaj u korpu 🛒
          </Button>
          <Button variant="outline" onClick={() => toggleFavorite(plant.id)}>
            {isFav ? 'Ukloni iz omiljenih ❤️' : 'Dodaj u omiljene 🤍'}
          </Button>
        </div>
      </div>
    </div>
  );
};