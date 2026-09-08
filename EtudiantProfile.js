// src/pages/EtudiantProfile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

// المستخدم الحالي (للمحاكاة)
const currentUserId = 2; // Sameh

function EtudiantProfile() {
  const navigate = useNavigate();
  const user = DB.users.find(u => u.id === currentUserId);
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    if (!user) return;
    const updatedUsers = DB.users.map(u => u.id === currentUserId ? { ...u, name } : u);
    DB.users = updatedUsers;
    alert('✅ Profil mis à jour avec succès !');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="etudiant-profile" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Mon Profil</h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>Gérez vos informations personnelles.</p>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', maxWidth: '500px', marginTop: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Nom complet</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Email</label>
            <input type="text" value={user?.email} disabled style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#f1f5f9' }} />
          </div>
          <button onClick={handleSave} style={{ width: '100%', padding: '10px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

export default EtudiantProfile;