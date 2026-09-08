// src/components/AdminSidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSidebar({ activeTab }) {
  const navigate = useNavigate();

  // مصفوفة الروابط لتجنب التكرار
  const menuItems = [
    { id: 'dashboard', label: 'Vue d\'ensemble', icon: '📊', path: '/dashboard/admin' },
    { id: 'users', label: 'Utilisateurs', icon: '👤', path: '/dashboard/admin/users' },
    { id: 'courses', label: 'Cours', icon: '📚', path: '/dashboard/admin/courses' },
    { id: 'categories', label: 'Catégories', icon: '📂', path: '/dashboard/admin/categories' },
    { id: 'statistics', label: 'Statistiques', icon: '📈', path: '/dashboard/admin/statistics' },
    { id: 'announcements', label: 'Annonces', icon: '📢', path: '/dashboard/admin/announcements' },
  ];

  // ✅ دالة تسجيل الخروج
  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      // مسح بيانات الجلسة
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      // التوجيه إلى صفحة تسجيل الدخول
      navigate('/login');
    }
  };

  return (
    <div style={{ width: '240px', background: '#fff', borderRight: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
        <div style={{ background: '#6C63FF', borderRadius: '8px', padding: '6px 8px', color: '#fff' }}>🎓</div>
        EduLearnpro
      </div>

      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Administration</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {menuItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{ 
              background: activeTab === item.id ? '#6C63FF' : 'transparent',
              color: activeTab === item.id ? '#fff' : '#64748b',
              padding: '12px 16px', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer', 
              fontWeight: activeTab === item.id ? '500' : '500',
              transition: 'all 0.2s'
            }}
          >
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div 
          onClick={() => navigate('/dashboard/admin/profile')}
          style={{ 
            padding: '12px 16px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: activeTab === 'profile' ? '#6C63FF' : '#64748b',
            cursor: 'pointer', 
            fontWeight: activeTab === 'profile' ? '500' : '500'
          }}
        >
          <span>👤</span> Profil
        </div>
        <div 
          onClick={() => navigate('/dashboard/admin/settings')}
          style={{ 
            padding: '12px 16px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: activeTab === 'settings' ? '#6C63FF' : '#64748b',
            cursor: 'pointer', 
            fontWeight: activeTab === 'settings' ? '500' : '500'
          }}
        >
          <span>⚙️</span> Paramètres
        </div>
        {/* ✅ زر Déconnexion الجديد */}
        <div 
          onClick={handleLogout}
          style={{ 
            padding: '12px 16px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: '#ef4444',
            cursor: 'pointer', 
            fontWeight: '500',
            transition: 'all 0.2s'
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

export default AdminSidebar;