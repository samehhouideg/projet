// src/pages/AdminProfile.js
import React, { useState } from 'react';
import { DB } from '../data';
import AdminSidebar from '../components/AdminSidebar';

function AdminProfile() {
  const adminUser = DB.users.find(u => u.role === 'admin') || DB.users[0];
  const [name, setName] = useState(adminUser.name);

  const handleSave = () => {
    const updatedUsers = DB.users.map(u => u.id === adminUser.id ? { ...u, name } : u);
    DB.users = updatedUsers;
    alert('✅ Profil mis à jour avec succès !');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar activeTab="profile" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Mon Profil</h1>
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', maxWidth: '500px' }}>
          <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Nom</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} /></div>
          <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Email</label><input type="text" value={adminUser.email} disabled style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#f1f5f9' }} /></div>
          <button onClick={handleSave} style={{ width: '100%', padding: '10px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;