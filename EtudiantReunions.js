// src/pages/EtudiantReunions.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

function EtudiantReunions() {
  const navigate = useNavigate();
  const [reunions] = useState(DB.reunions || []);
  const [filter, setFilter] = useState('upcoming');

  // تصفية الاجتماعات
  const filteredReunions = reunions.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  // تنسيق التاريخ
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  // ألوان الحالة
  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return '#3b82f6';
      case 'live': return '#22c55e';
      case 'finished': return '#64748b';
      default: return '#64748b';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'upcoming': return '🔜 À venir';
      case 'live': return '🟢 En direct';
      case 'finished': return '✅ Terminé';
      default: return status;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="reunions" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Réunions en ligne</h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Séances live avec vos professeurs.</p>
          </div>
        </div>

        {/* أزرار التصفية */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button onClick={() => setFilter('upcoming')} style={{ background: filter === 'upcoming' ? '#6C63FF' : '#fff', color: filter === 'upcoming' ? '#fff' : '#475569', border: '1px solid #e2e8f0', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: '500' }}>🔜 À venir</button>
          <button onClick={() => setFilter('live')} style={{ background: filter === 'live' ? '#6C63FF' : '#fff', color: filter === 'live' ? '#fff' : '#475569', border: '1px solid #e2e8f0', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: '500' }}>🟢 En direct</button>
          <button onClick={() => setFilter('finished')} style={{ background: filter === 'finished' ? '#6C63FF' : '#fff', color: filter === 'finished' ? '#fff' : '#475569', border: '1px solid #e2e8f0', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: '500' }}>✅ Terminées</button>
          <button onClick={() => setFilter('all')} style={{ background: filter === 'all' ? '#6C63FF' : '#fff', color: filter === 'all' ? '#fff' : '#475569', border: '1px solid #e2e8f0', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: '500' }}>Toutes</button>
        </div>

        {/* قائمة الاجتماعات */}
        {filteredReunions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Aucune réunion trouvée</h3>
            <p style={{ color: '#64748b' }}>Il n'y a pas de réunions correspondant à ce filtre.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredReunions.map((reunion) => (
              <div key={reunion.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{reunion.title}</h3>
                      <span style={{ background: getStatusColor(reunion.status), color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                        {getStatusLabel(reunion.status)}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px', lineHeight: '1.6' }}>{reunion.description}</p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#64748b' }}>
                      <span>📅 {formatDate(reunion.date)}</span>
                      <span>🕒 {reunion.time} ({reunion.duration})</span>
                      <span>👨‍🏫 {reunion.professor}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    {reunion.status === 'upcoming' && reunion.link !== '#' && (
                      <button onClick={() => window.open(reunion.link, '_blank')} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
                        📹 Rejoindre la réunion
                      </button>
                    )}
                    {reunion.status === 'live' && reunion.link !== '#' && (
                      <button onClick={() => window.open(reunion.link, '_blank')} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
                        📹 Rejoindre (Live)
                      </button>
                    )}
                    {reunion.status === 'finished' && (
                      <span style={{ fontSize: '13px', color: '#64748b', padding: '8px 20px' }}>🗂️ Enregistrement disponible</span>
                    )}
                    {reunion.link === '#' && reunion.status !== 'finished' && (
                      <span style={{ fontSize: '12px', color: '#ef4444' }}>⚠️ Lien non disponible</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EtudiantReunions;