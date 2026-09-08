// src/components/ProfSidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfSidebar({ activeTab }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Professeur';

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊', path: '/dashboard/professeur' },
    { id: 'courses', label: 'Mes cours', icon: '📚', path: '/dashboard/professeur/courses' },
    { id: 'quiz', label: 'Quiz', icon: '📝', path: '/dashboard/professeur/quiz' },
    { id: 'tp', label: 'TP', icon: '💻', path: '/dashboard/professeur/tp' },
    { id: 'reunions', label: 'Réunions', icon: '📞', path: '/dashboard/professeur/reunions' },
    { id: 'messages', label: 'Messages', icon: '💬', path: '/dashboard/professeur/messages' },
    { id: 'corrections', label: 'Corrections', icon: '📝', path: '/dashboard/professeur/corrections' },
    { id: 'calendrier', label: 'Calendrier', icon: '📅', path: '/dashboard/professeur/calendrier' },
  ];

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vous déconnecter ?')) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      navigate('/login');
    }
  };

  return (
    <div style={{ width: '240px', background: '#fff', borderRight: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#6C63FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
          {userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '14px' }}>{userName}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Professeur</div>
        </div>
      </div>

      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>ENSEIGNEMENT</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {menuItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => item.path && navigate(item.path)}
            style={{ 
              background: activeTab === item.id ? '#6C63FF' : 'transparent',
              color: activeTab === item.id ? '#fff' : '#64748b',
              padding: '10px 14px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div onClick={() => navigate('/dashboard/professeur/profile')} style={{ padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', cursor: 'pointer', fontWeight: '500' }}>
          <span>👤</span> Profil
        </div>
        <div onClick={() => navigate('/dashboard/professeur/settings')} style={{ padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', cursor: 'pointer', fontWeight: '500' }}>
          <span>⚙️</span> Paramètres
        </div>
        <div onClick={handleLogout} style={{ padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', cursor: 'pointer', fontWeight: '500' }}>
          <span>🚪</span> Déconnexion
        </div>
      </div>
    </div>
  );
}

export default ProfSidebar;