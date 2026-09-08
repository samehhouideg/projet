// src/pages/AdminStatistics.js
import React from 'react';
import { DB } from '../data';
import AdminSidebar from '../components/AdminSidebar';

function AdminStatistics() {
  // --- إحصائيات حقيقية ---
  const totalUsers = DB.users.length;
  const totalCourses = DB.courses.length;
  const totalStudents = DB.users.filter(u => u.role === 'etudiant').length;
  const totalTeachers = DB.users.filter(u => u.role === 'professeur').length;
  const totalAdmins = DB.users.filter(u => u.role === 'admin').length;

  // --- بيانات الرسم البياني (لأسبوعين) ---
  const chartLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const chartData = [820, 950, 1050, 1200, 1150, 1400, 1280, 1350, 1100, 1250, 1450, 1380, 1200, 1500];
  const maxData = Math.max(...chartData);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar activeTab="statistics" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Statistiques</h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Aperçu détaillé de la plateforme EduLearnpro.</p>

        {/* الكروت العلوية */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '500' }}>👤 Utilisateurs</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: '4px 0' }}>{totalUsers}</h3>
            <p style={{ color: '#22c55e', fontSize: '12px' }}>+12% ce mois</p>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '500' }}>📚 Cours</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: '4px 0' }}>{totalCourses}</h3>
            <p style={{ color: '#22c55e', fontSize: '12px' }}>+3 ce mois</p>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '500' }}>🎓 Étudiants</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: '4px 0' }}>{totalStudents}</h3>
            <p style={{ color: '#22c55e', fontSize: '12px' }}>+15% ce mois</p>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '500' }}>👨‍🏫 Professeurs</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: '4px 0' }}>{totalTeachers}</h3>
            <p style={{ color: '#22c55e', fontSize: '12px' }}>+5 ce mois</p>
          </div>
        </div>

        {/* الرسم البياني */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>📊 Fréquentation (14 jours)</h3>
          </div>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2px', padding: '0 4px' }}>
            {chartData.map((val, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                <div 
                  style={{ 
                    width: '80%', 
                    height: `${(val / maxData) * 90}%`, 
                    background: 'linear-gradient(to top, #6C63FF, #a78bfa)', 
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.5s ease',
                    boxShadow: '0 -2px 10px rgba(108, 99, 255, 0.2)'
                  }}
                ></div>
                <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '6px', fontWeight: '500' }}>{chartLabels[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ملخص سريع */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '13px', color: '#64748b' }}>👨‍💼 Admins</p>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{totalAdmins}</h3>
          </div>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '13px', color: '#64748b' }}>📈 Taux de réussite</p>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>87%</h3>
          </div>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '13px', color: '#64748b' }}>🏆 Meilleur cours</p>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{DB.courses[0]?.title || 'Aucun'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStatistics;