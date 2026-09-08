// src/pages/ProfCorrections.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

function ProfCorrections() {
  const navigate = useNavigate();
  
  // جميع TP التي تحتاج تصحيح (تقدر تخصصها أكثر)
  const [itemsToCorrect] = useState(DB.tps || []);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = itemsToCorrect.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="corrections" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Corrections</h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>Consultez les travaux à corriger.</p>
        
        <div style={{ marginBottom: '24px', background: '#fff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ color: '#94a3b8', marginRight: '12px' }}>🔍</span>
          <input type="text" placeholder="Rechercher un travail à corriger..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '15px', background: 'transparent' }} />
        </div>

        <div>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Aucun travail à corriger</h3>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {filteredItems.map((item) => (
                <div key={item.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>{item.description}</p>
                  <button onClick={() => navigate(`/dashboard/professeur/tp/${item.id}`)} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
                    Corriger →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfCorrections;