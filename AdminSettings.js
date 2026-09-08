// src/pages/AdminSettings.js
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'EduLearnpro',
    allowRegistration: true,
    maintenanceMode: false,
  });

  const handleSave = () => alert('✅ Paramètres enregistrés !');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar activeTab="settings" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Paramètres</h1>
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', maxWidth: '500px' }}>
          <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Nom du site</label><input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} /></div>
          <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontWeight: '500' }}>Inscriptions</label>
            <input type="checkbox" checked={settings.allowRegistration} onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })} />
          </div>
          <button onClick={handleSave} style={{ width: '100%', padding: '10px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;