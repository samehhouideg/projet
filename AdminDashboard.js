// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import AdminSidebar from '../components/AdminSidebar';

function AdminDashboard() {
  const navigate = useNavigate();
  const totalUsers = DB.users.length;
  const totalCourses = DB.courses.length;
  const totalStudents = DB.users.filter(u => u.role === 'etudiant').length;
  const totalTeachers = DB.users.filter(u => u.role === 'professeur').length;
  const pendingRequests = DB.users.filter(u => u.status === 'pending').length;

  const activities = [
    { id: 1, action: 'Nouvel étudiant inscrit', user: 'Amine Tazi', time: 'il y a 10 min', icon: '👤', color: '#22c55e' },
    { id: 2, action: 'Cours publié', user: 'Python pour débutants', time: 'il y a 1 heure', icon: '📚', color: '#6C63FF' },
  ];

  const quickStats = [
    { label: 'Utilisateurs', value: totalUsers, color: '#6C63FF' },
    { label: 'Cours', value: totalCourses, color: '#22c55e' },
    { label: 'En attente', value: pendingRequests, color: '#f59e0b' },
    { label: 'Professeurs', value: totalTeachers, color: '#3b82f6' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar activeTab="dashboard" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Vue d'ensemble</h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Bienvenue sur votre tableau de bord.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {quickStats.map((stat, index) => (
            <div key={index} style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '500' }}>{stat.label}</span>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>{stat.value}</h3>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>🔔 Activités récentes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activities.map((activity) => (
              <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px' }}>
                <div style={{ background: '#e2e8f0', padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{activity.icon}</div>
                <div><div style={{ fontWeight: '500', fontSize: '14px', color: '#0f172a' }}>{activity.action}</div><div style={{ fontSize: '13px', color: '#64748b' }}>{activity.user} • {activity.time}</div></div>
                <div style={{ background: activity.color, width: '8px', height: '8px', borderRadius: '50%' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;