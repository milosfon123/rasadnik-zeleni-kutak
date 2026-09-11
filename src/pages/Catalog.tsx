import React, { useState, useEffect } from 'react';
import { plantService } from '../services/plantService';
import { PlantCard } from '../components/PlantCard';
import { InputField } from '../components/InputField';
import { useApp } from '../context/AppContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Loader } from '../components/Loader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Plant } from '../types/plant';

export const Catalog: React.FC = () => {
  useDocumentTitle('Katalog Biljaka');
  const { addToCart } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('sve');
  const [sortBy, setSortBy] = useState<string>('default');

  useEffect(() => {
    setIsLoading(true);
    plantService.getPlantsAsync().then((data) => {
      setPlants(data);
      setIsLoading(false);
    });
  }, []);

  // Automatsko postavljanje kategorije ako je stigla preko URL-a sa Home strane
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories = ['sve', ...Array.from(new Set(plants.map((p) => p.category)))];

  // Filtriranje po nazivu i kategoriji
  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'sve' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sortiranje filtriranih biljaka
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;

    if (sortBy === 'price-asc') {
      return priceA - priceB;
    }
    if (sortBy === 'price-desc') {
      return priceB - priceA;
    }
    if (sortBy === 'popular') {
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
    return 0;
  });

  return (
    <div className="catalog-container">
      <h2>Katalog Biljaka 🌿</h2>

      <div className="catalog-filters" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <InputField
              label="Pretraga"
              placeholder="Pretraži po nazivu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-dark)' }}>
              Sortiraj po:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: 'var(--border-radius)',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="default">Podrazumevano</option>
              <option value="price-asc">Cena: Od najniže</option>
              <option value="price-desc">Cena: Od najviše</option>
              <option value="popular">Najpopularnije</option>
            </select>
          </div>
        </div>

        <div className="category-buttons" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
      ) : sortedPlants.length > 0 ? (
        <div className="plants-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {sortedPlants.map((plant) => (
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
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
          Nijedna biljka ne odgovara zadatim kriterijumima.
        </p>
      )}
    </div>
  );
};