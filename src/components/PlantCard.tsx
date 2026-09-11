import React from 'react';
import type { Plant } from '../types/plant';
import { PlantModel } from '../models/PlantModel';
import { Button } from './Button';

interface PlantCardProps {
  plant: Plant;
  onAddToCart?: (plant: Plant) => void;
  onSelect?: (id: string) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onAddToCart, onSelect }) => {
  const model = new PlantModel(plant);

  return (
    <div className="plant-card" onClick={() => onSelect && onSelect(plant.id)}>
      <div className="plant-card-img-wrapper">
        <img src={plant.image} alt={plant.name} className="plant-card-img" />
        {model.hasDiscount() && (
          <span className="badge badge-discount">-{model.getDiscountPercentage()}%</span>
        )}
        {plant.isPopular && <span className="badge badge-popular">Popularno</span>}
      </div>
      <div className="plant-card-content">
        <span className="plant-card-category">{plant.category.toUpperCase()}</span>
        <h3 className="plant-card-title">{plant.name}</h3>
        <p className="plant-card-latin">{plant.latinName}</p>

        <div className="plant-card-footer">
          <div className="plant-card-price">
            {model.hasDiscount() ? (
              <>
                <span className="price-old">{plant.price} RSD</span>
                <span className="price-current">{plant.discountPrice} RSD</span>
              </>
            ) : (
              <span className="price-current">{plant.price} RSD</span>
            )}
          </div>
          {onAddToCart && (
            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(plant);
              }}
            >
              Dodaj 🛒
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};