import React, { useState, useEffect } from 'react';
import { plantService } from '../services/plantService';
import { PlantCard } from '../components/PlantCard';
import { InputField } from '../components/InputField';
import { useApp } from '../context/AppContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Loader } from '../components/Loader';
import type { Plant } from '../types/plant';

export const Catalog: React.FC = () => {
  useDocumentTitle('Katalog Biljaka');
  const { addToCart } = useApp();

  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('sve');

  useEffect(() => {
    setIsLoading(true);
    plantService.getPlantsAsync().then((data) => {
      setPlants(data);
      setIsLoading(false);
    });
  }, []);

  const categories = ['sve', ...Array.from(new Set(plants.map((p) => p.category)))];

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'sve' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="catalog-container">
      <h2>Katalog Biljaka 🌿</h2>

      <div className="catalog-filters">
        <InputField
          label="Pretraga"
          placeholder="Pretraži po nazivu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="category-buttons" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid var(--green-primary)',
                backgroundColor: selectedCategory === cat ? 'var(--green-primary)' : 'transparent',
                color: selectedCategory === cat ? 'white' : 'var(--green-primary)',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : filteredPlants.length > 0 ? (
        <div className="plants-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} onAddToCart={addToCart} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
          Nijedna biljka ne odgovara zadatim kriterijumima.
        </p>
      )}
    </div>
  );
};