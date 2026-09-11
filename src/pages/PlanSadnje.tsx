import React, { useState } from 'react';
import { Button } from '../components/Button';

export const PlanSadnje: React.FC = () => {
  const [season, setSeason] = useState('prolece');
  const [space, setSpace] = useState('unutra');

  return (
    <div className="plan-container">
      <h2>Plan Sadnje i Nega 📅</h2>
      <p>Izaberite godišnje doba i mesto gajenja da vidite preporuke za sadnju:</p>

      <div className="plan-form">
        <div className="form-group">
          <label>Godišnje doba:</label>
          <select value={season} onChange={(e) => setSeason(e.target.value)} className="input-control">
            <option value="prolece">Proleće</option>
            <option value="leto">Leto</option>
            <option value="jesen">Jesen</option>
            <option value="zima">Zima</option>
          </select>
        </div>

        <div className="form-group">
          <label>Prostor za gajenje:</label>
          <select value={space} onChange={(e) => setSpace(e.target.value)} className="input-control">
            <option value="unutra">Dnevna soba / Stan</option>
            <option value="terasa">Balkon / Terasa</option>
            <option value="basta">Dvorište / Bašta</option>
          </select>
        </div>
      </div>

      <div className="plan-results">
        <h3>Saveti za {season.toUpperCase()} ({space})</h3>
        {season === 'prolece' && (
          <p>🌱 Savršeno vreme za presađivanje sobnih biljaka u veću saksiju i sadnju voća na otvorenom.</p>
        )}
        {season === 'leto' && (
          <p>☀️ Povećajte učestalost zalivanja u ranim jutarnjim ili kasnim večernjim satima.</p>
        )}
        {season === 'jesen' && (
          <p>🍂 Unesite osetljive biljke u zatvoren prostor pre prvih mrazeva.</p>
        )}
        {season === 'zima' && (
          <p>❄️ Smanjite zalivanje i držite biljke dalje od direktnih izvora toplote (radijatora).</p>
        )}
        <Button variant="secondary" onClick={() => alert('Vodič sačuvan u vašem profilu!')}>
          Sačuvaj Moj Plan 📋
        </Button>
      </div>
    </div>
  );
};