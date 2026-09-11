import React from 'react';
import { plantService } from '../services/plantService';
import { PlantCard } from '../components/PlantCard';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  const popularPlants = plantService.getPopularPlants();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Unesite prirodu u vaš dom 🪴</h1>
          <p>
            Otkrijte najlepše sobne i spoljašnje biljke, stručne savete za negu i sve što vam je potrebno za vaš zeleni kutak.
          </p>
          <div className="hero-buttons">
            <a href="/katalog"><Button variant="primary">Istraži Katalog</Button></a>
            <a href="/plan-sadnje"><Button variant="secondary">Plan Sadnje</Button></a>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2>Najpopularnije Biljke 🔥</h2>
        <div className="plants-grid">
          {popularPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>
    </div>
  );
};