// src/pages/ProfReunions.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

function ProfReunions() {
  const navigate = useNavigate();
  
  const [reunions, setReunions] = useState(DB.reunions || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newReunion, setNewReunion] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '1h',
    professor: localStorage.getItem('userName') || 'Professeur',
    link: '',
    status: 'upcoming'
  });

  const handleAddReunion = () => {
    if (newReunion.title.trim() === '' || newReunion.date.trim() === '') {
      alert('Veuillez remplir le titre et la date.');
      return;
    }

    const newId = reunions.length > 0 ? Math.max(...reunions.map(r => r.id)) + 1 : 1;
    const reunionToAdd = { ...newReunion, id: newId };
    
    DB.reunions.push(reunionToAdd);
    setReunions([...reunions, reunionToAdd]);
    
    setShowAddModal(false);
    setNewReunion({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '1h',
      professor: localStorage.getItem('userName') || 'Professeur',
      link: '',
      status: 'upcoming'
    });
    alert('✅ Réunion ajoutée avec succès !');
  };

  const handleDeleteReunion = (reunionId, reunionTitle) => {
    if (window.confirm(`Voulez-vous supprimer la réunion "${reunionTitle}" ?`)) {
      const updatedReunions = reunions.filter(r => r.id !== reunionId);
      DB.reunions = updatedReunions;
      setReunions(updatedReunions);
      alert('🗑️ Réunion supprimée avec succès.');
    }
  };

  const filteredReunions = reunions.filter(reunion =>
    reunion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reunion.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="reunions" />
      
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Réunions</h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Gérez vos réunions en ligne. ({reunions.length} réunions)</p>
          </div>
          <button onClick={() => setShowAddModal(true)} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
            + Nouvelle réunion
          </button>
        </div>

        <div style={{ marginBottom: '24px', background: '#fff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ color: '#94a3b8', marginRight: '12px' }}>🔍</span>
          <input type="text" placeholder="Rechercher une réunion..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '15px', background: 'transparent' }} />
        </div>

        {filteredReunions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Aucune réunion trouvée</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredReunions.map((reunion) => (
              <div key={reunion.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>{reunion.title}</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>{reunion.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#64748b' }}>
                      <span>📅 {formatDate(reunion.date)}</span>
                      <span>🕒 {reunion.time} ({reunion.duration})</span>
                      <span>👨‍🏫 {reunion.professor}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => navigate(`/dashboard/professeur/reunions/${reunion.id}`)} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✏️</button>
                    <button onClick={() => handleDeleteReunion(reunion.id, reunion.title)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '600px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Créer une nouvelle réunion</h2>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Titre</label>
              <input type="text" value={newReunion.title} onChange={(e) => setNewReunion({ ...newReunion, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Description</label>
              <textarea value={newReunion.description} onChange={(e) => setNewReunion({ ...newReunion, description: e.target.value })} rows="3" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Date</label>
                <input type="date" value={newReunion.date} onChange={(e) => setNewReunion({ ...newReunion, date: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Heure</label>
                <input type="time" value={newReunion.time} onChange={(e) => setNewReunion({ ...newReunion, time: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Durée</label>
              <input type="text" value={newReunion.duration} onChange={(e) => setNewReunion({ ...newReunion, duration: e.target.value })} placeholder="Ex: 1h 30min" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Lien (Meet, Zoom...)</label>
              <input type="text" value={newReunion.link} onChange={(e) => setNewReunion({ ...newReunion, link: e.target.value })} placeholder="https://meet.google.com/..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Statut</label>
              <select value={newReunion.status} onChange={(e) => setNewReunion({ ...newReunion, status: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                <option value="upcoming">🔜 À venir</option>
                <option value="live">🟢 En direct</option>
                <option value="finished">✅ Terminée</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'transparent', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleAddReunion} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#6C63FF', color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfReunions;