// src/components/EtudiantSidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EtudiantSidebar({ activeTab }) {
  const navigate = useNavigate();

  // ✅ قراءة اسم المستخدم من localStorage
  const userName = localStorage.getItem('userName') || 'Étudiant';

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊', path: '/dashboard/etudiant' },
    { id: 'courses', label: 'Cours', icon: '📚', path: '/dashboard/etudiant/courses' },
    { id: 'favoris', label: 'Favoris', icon: '🤍', path: '/dashboard/etudiant/favoris' },
    { id: 'calendrier', label: 'Calendrier', icon: '📅', path: '/dashboard/etudiant/calendrier' },
    { id: 'quiz', label: 'Quiz', icon: '📝', path: '/dashboard/etudiant/quiz' },
    { id: 'tp', label: 'TP', icon: '💻', path: '/dashboard/etudiant/tp' },
    { id: 'reunions', label: 'Réunions', icon: '📞', path: '/dashboard/etudiant/reunions' },
    { id: 'messages', label: 'Messages', icon: '💬', path: '/dashboard/etudiant/messages' },
    { id: 'notes', label: 'Notes', icon: '📝', path: '/dashboard/etudiant/notes' },
    { id: 'certificats', label: 'Certificats', icon: '🎓', path: '/dashboard/etudiant/certificats' },
  ];

  // ✅ دالة تسجيل الخروج
  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      navigate('/login');
    }
  };

  return (
    <div style={{ width: '240px', background: '#fff', borderRight: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* ✅ عرض اسم الطالب في الأعلى */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          background: '#6C63FF', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#fff', 
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          {userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '14px' }}>{userName}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Étudiant</div>
        </div>
      </div>

      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>APPRENTISSAGE</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {menuItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => item.path !== '#' && navigate(item.path)}
            style={{ 
              background: activeTab === item.id ? '#6C63FF' : 'transparent',
              color: activeTab === item.id ? '#fff' : '#64748b',
              padding: '10px 14px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: item.path !== '#' ? 'pointer' : 'default',
              fontWeight: '500',
              opacity: item.path === '#' ? 0.5 : 1
            }}
          >
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
      </div>

      {/* ✅ القسم السفلي (Profil, Paramètres, Déconnexion) */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div 
          onClick={() => navigate('/dashboard/etudiant/profile')}
          style={{ 
            padding: '10px 14px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: activeTab === 'etudiant-profile' ? '#6C63FF' : '#64748b',
            cursor: 'pointer', 
            fontWeight: '500'
          }}
        >
          <span>👤</span> Profil
        </div>
        <div 
          onClick={() => navigate('/dashboard/etudiant/settings')}
          style={{ 
            padding: '10px 14px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: activeTab === 'etudiant-settings' ? '#6C63FF' : '#64748b',
            cursor: 'pointer', 
            fontWeight: '500'
          }}
        >
          <span>⚙️</span> Paramètres
        </div>
        <div 
          onClick={handleLogout}
          style={{ 
            padding: '10px 14px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: '#ef4444',
            cursor: 'pointer', 
            fontWeight: '500',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span>🚪</span> Déconnexion
        </div>
      </div>
    </div>
  );
}

export default EtudiantSidebar;