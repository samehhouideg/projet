// src/pages/EtudiantSettings.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EtudiantSidebar from '../components/EtudiantSidebar';

function EtudiantSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleSave = () => {
    alert('✅ Paramètres enregistrés avec succès !');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="etudiant-settings" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Paramètres</h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>Gérez vos préférences.</p>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', maxWidth: '500px', marginTop: '20px' }}>
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontWeight: '500' }}>Notifications</label>
            <input type="checkbox" checked={settings.notifications} onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })} />
          </div>
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontWeight: '500' }}>Mode sombre</label>
            <input type="checkbox" checked={settings.darkMode} onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })} />
          </div>
          <button onClick={handleSave} style={{ width: '100%', padding: '10px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

export default EtudiantSettings;