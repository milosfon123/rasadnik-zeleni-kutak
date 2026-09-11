import React, { useState } from 'react';
import { plantService } from '../services/plantService';
import { PlantCard } from '../components/PlantCard';
import { InputField } from '../components/InputField';
import { useApp } from '../context/AppContext';
import type { Category } from '../types/plant';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'sve'>('sve');
  const { addToCart } = useApp();

  const allPlants = plantService.getAllPlants();

  const filteredPlants = allPlants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plant.latinName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'sve' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
useDocumentTitle('Katalog Biljaka');
  return (
    <div className="catalog-container">
      <h2>Katalog Biljaka 🌿</h2>

      <div className="catalog-controls">
        <InputField
          type="text"
          placeholder="Pretraži biljke po nazivu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="category-filters">
          {(['sve', 'sobne', 'spoljasnje', 'voce'] as const).map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'sve' ? 'Sve Biljke' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="plants-grid">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} onAddToCart={addToCart} />
          ))
        ) : (
          <p className="no-results">Nijedna biljka ne odgovara vašoj pretrazi.</p>
        )}
      </div>
    </div>
  );
};