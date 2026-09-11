import React, { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const PlanSadnje: React.FC = () => {
  useDocumentTitle('Plan Sadnje');
  const [activeTab, setActiveTab] = useState<'prolece' | 'leto' | 'jesen'>('prolece');

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '2.5rem', backgroundColor: '#8FBC8F', borderRadius: '16px', color: '#4a3b32', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2>Interaktivni plan i kalendar sadnje 🌿</h2>
      <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
        Izaberite period godine da vidite ključne aktivnosti za održavanje vašeg vrta.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setActiveTab('prolece')} style={{ backgroundColor: activeTab === 'prolece' ? '#2c5e3b' : '#e8e2d5', color: activeTab === 'prolece' ? 'white' : '#4a3b32', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>Proleće</button>
        <button onClick={() => setActiveTab('leto')} style={{ backgroundColor: activeTab === 'leto' ? '#2c5e3b' : '#e8e2d5', color: activeTab === 'leto' ? 'white' : '#4a3b32', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>Leto</button>
        <button onClick={() => setActiveTab('jesen')} style={{ backgroundColor: activeTab === 'jesen' ? '#2c5e3b' : '#e8e2d5', color: activeTab === 'jesen' ? 'white' : '#4a3b32', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>Jesen</button>
      </div>

      <div style={{ backgroundColor: '#e8e2d5', padding: '2rem', borderRadius: '12px' }}>
        {activeTab === 'prolece' && (
          <div>
            <h3>Prolećni radovi (Mart - Maj)</h3>
            <ul>
              <li>Priprema i prekopavanje zemljišta nakon zime.</li>
              <li>Đubrenje organskim kompostom.</li>
              <li>Sejanje semena u zatvorenom i sadnja ranog povrća i ukrasnog bilja.</li>
            </ul>
          </div>
        )}
        {activeTab === 'leto' && (
          <div>
            <h3>Letnja nega (Jun - Avgust)</h3>
            <ul>
              <li>Redovno zalivanje (isključivo rano ujutru ili uveče).</li>
              <li>Uklanjanje precvetalih cvetova i zaštita od štetočina.</li>
              <li>Prihrana biljaka na svake dve nedelje.</li>
            </ul>
          </div>
        )}
        {activeTab === 'jesen' && (
          <div>
            <h3>Jesenje čišćenje (Septembar - Novembar)</h3>
            <ul>
              <li>Sakupljanje opalog lišća i pravljenje komposta.</li>
              <li>Sadnja lukovičastog cveća za proleće.</li>
              <li>Zaštita osetljivih biljaka od mraza.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};