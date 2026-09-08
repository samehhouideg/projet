// src/pages/ProfTP.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

function ProfTP() {
  const navigate = useNavigate();
  
  const [tps, setTps] = useState(DB.tps || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // نموذج إضافة TP جديد
  const [newTP, setNewTP] = useState({
    title: '',
    description: '',
    starterCode: '',
    solution: '',
    xp: 100
  });

  // دالة إضافة TP
  const handleAddTP = () => {
    if (newTP.title.trim() === '' || newTP.description.trim() === '') {
      alert('Veuillez remplir le titre et la description.');
      return;
    }

    const newId = tps.length > 0 ? Math.max(...tps.map(t => t.id)) + 1 : 1;
    const tpToAdd = { ...newTP, id: newId };
    
    DB.tps.push(tpToAdd);
    setTps([...tps, tpToAdd]);
    
    setShowAddModal(false);
    setNewTP({
      title: '',
      description: '',
      starterCode: '',
      solution: '',
      xp: 100
    });
    alert('✅ TP ajouté avec succès !');
  };

  // دالة حذف TP
  const handleDeleteTP = (tpId, tpTitle) => {
    if (window.confirm(`Voulez-vous supprimer le TP "${tpTitle}" ?`)) {
      const updatedTps = tps.filter(t => t.id !== tpId);
      DB.tps = updatedTps;
      setTps(updatedTps);
      alert('🗑️ TP supprimé avec succès.');
    }
  };

  // فلترة TP
  const filteredTps = tps.filter(tp =>
    tp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="tp" />
      
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Travaux Pratiques (TP)</h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Gérez vos TP et code. ({tps.length} TP)</p>
          </div>
          <button onClick={() => setShowAddModal(true)} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
            + Nouveau TP
          </button>
        </div>

        {/* شريط البحث */}
        <div style={{ marginBottom: '24px', background: '#fff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ color: '#94a3b8', marginRight: '12px' }}>🔍</span>
          <input type="text" placeholder="Rechercher un TP..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '15px', background: 'transparent' }} />
        </div>

        {/* شبكة التمارين */}
        {filteredTps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Aucun TP trouvé</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredTps.map((tp) => (
              <div key={tp.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>{tp.title}</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>{tp.description}</p>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#64748b' }}>
                      <span>💻 1 exercice</span>
                      <span>⭐ +{tp.xp} XP</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => navigate(`/dashboard/professeur/tp/${tp.id}`)} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✏️</button>
                    <button onClick={() => handleDeleteTP(tp.id, tp.title)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === نافذة إضافة TP (Modal) === */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '600px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Créer un nouveau TP</h2>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Titre du TP</label>
              <input type="text" value={newTP.title} onChange={(e) => setNewTP({ ...newTP, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Description</label>
              <textarea value={newTP.description} onChange={(e) => setNewTP({ ...newTP, description: e.target.value })} rows="3" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Starter Code (Code initial)</label>
              <textarea value={newTP.starterCode} onChange={(e) => setNewTP({ ...newTP, starterCode: e.target.value })} rows="5" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontFamily: 'monospace', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Solution</label>
              <textarea value={newTP.solution} onChange={(e) => setNewTP({ ...newTP, solution: e.target.value })} rows="5" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontFamily: 'monospace', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>XP à gagner</label>
              <input type="number" value={newTP.xp} onChange={(e) => setNewTP({ ...newTP, xp: parseInt(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'transparent', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleAddTP} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#6C63FF', color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Enregistrer le TP</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfTP;