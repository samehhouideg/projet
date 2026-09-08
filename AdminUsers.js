// src/pages/AdminUsers.js
import React, { useState } from 'react';
import { DB } from '../data';
import AdminSidebar from '../components/AdminSidebar';

function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(DB.users);
  const pendingUsers = users.filter(u => u.status === 'pending').length;

  const handleApproveUser = (userId) => {
    const updatedUsers = users.map(u => u.id === userId ? { ...u, status: 'active' } : u);
    DB.users = updatedUsers;
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Voulez-vous supprimer cet utilisateur ?')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      DB.users = updatedUsers;
      setUsers(updatedUsers);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar activeTab="users" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Gestion des utilisateurs</h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Ajoutez, validez et administrez les comptes.</p>

        {pendingUsers > 0 && (
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
            <span style={{ color: '#f59e0b', fontWeight: '600' }}>{pendingUsers} compte(s) en attente de validation</span>
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }} />
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#64748b' }}>Nom</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#64748b' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#64748b' }}>Rôle</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#64748b' }}>Statut</th>
              <th style={{ padding: '12px', textAlign: 'right', color: '#64748b' }}>Actions</th>
            </tr></thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{user.name}</td>
                  <td style={{ padding: '12px', color: '#475569' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}><span style={{ background: '#f1f5f9', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{user.role}</span></td>
                  <td style={{ padding: '12px' }}><span style={{ background: user.status === 'active' ? '#dcfce7' : '#fef9c3', color: user.status === 'active' ? '#16a34a' : '#ca8a04', padding: '4px 12px', borderRadius: '20px' }}>{user.status}</span></td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    {user.status === 'pending' && <button onClick={() => handleApproveUser(user.id)} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}>✔</button>}
                    <button onClick={() => handleDeleteUser(user.id)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;