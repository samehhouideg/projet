// src/pages/EtudiantAnnonces.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

function EtudiantAnnonces() {
  const navigate = useNavigate();

  // جلب الإعلانات من قاعدة البيانات
  const [announcements, setAnnouncements] = useState(DB.announcements || []);
  const [searchTerm, setSearchTerm] = useState('');

  // فلترة الإعلانات بناءً على البحث
  const filteredAnnouncements = announcements.filter(ann =>
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // تنسيق التاريخ
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  // تحديد لون الشارة حسب الجمهور المستهدف
  const getTargetColor = (target) => {
    switch(target) {
      case 'Tous': return '#6C63FF';
      case 'Étudiants': return '#22c55e';
      case 'Professeurs': return '#f59e0b';
      default: return '#6C63FF';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="annonces" />
      
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Annonces</h1>
          <p style={{ fontSize: '15px', color: '#64748b' }}>Restez informé des dernières nouvelles et mises à jour de la plateforme.</p>
        </div>

        {/* شريط البحث */}
        <div style={{ marginBottom: '24px', background: '#fff', padding: '12px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#94a3b8', marginRight: '12px', fontSize: '18px' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Rechercher une annonce..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '15px', background: 'transparent', color: '#0f172a' }} 
          />
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📢</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Aucune annonce pour le moment</h3>
            <p style={{ color: '#64748b' }}>Veuillez vérifier plus tard pour les nouvelles mises à jour.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {filteredAnnouncements.map((announcement) => (
              <div 
                key={announcement.id} 
                style={{ 
                  background: '#fff', 
                  borderRadius: '16px', 
                  border: '1px solid #e2e8f0', 
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{announcement.title}</h3>
                      <span 
                        style={{ 
                          background: getTargetColor(announcement.target), 
                          color: '#fff', 
                          padding: '4px 14px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '500'
                        }}
                      >
                        {announcement.target}
                      </span>
                      <span style={{ fontSize: '14px', color: '#64748b', marginLeft: '8px' }}>
                        🗓️ {formatDate(announcement.date)}
                      </span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginTop: '12px' }}>
                      {announcement.content}
                    </p>
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

export default EtudiantAnnonces;