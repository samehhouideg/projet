// src/pages/EtudiantNotes.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

const currentUserId = 2; // Sameh

function EtudiantNotes() {
  const navigate = useNavigate();
  const currentUser = DB.users.find(u => u.id === currentUserId);

  // 1. حساب نقاط XP الخاصة بالطالب
  const totalXP = currentUser?.xp || 0;

  // 2. جلب جميع الطلاب وترتيبهم حسب النقاط (للتصنيف)
  const allStudents = DB.users
    .filter(u => u.role === 'etudiant')
    .sort((a, b) => b.xp - a.xp);

  // 3. معرفة ترتيب الطالب الحالي
  const userRank = allStudents.findIndex(u => u.id === currentUserId) + 1;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="notes" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Mes notes & Comparaison</h1>

        {/* بطاقة الملخص */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <p style={{ color: '#64748b' }}>Mes Points XP</p>
            <h2 style={{ fontSize: '32px', margin: 0, color: '#6C63FF' }}>{totalXP} XP</h2>
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <p style={{ color: '#64748b' }}>Mon Rang</p>
            <h2 style={{ fontSize: '32px', margin: 0, color: '#f59e0b' }}>#{userRank}</h2>
          </div>
        </div>

        {/* لوحة التصنيف (Comparaison avec les autres) */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
          <h3 style={{ marginBottom: '16px' }}>🏆 Classement des étudiants</h3>
          {allStudents.length === 0 ? (
            <p style={{ color: '#64748b' }}>Aucun autre étudiant pour le moment.</p>
          ) : (
            <div>
              {allStudents.map((student, index) => {
                const isMe = student.id === currentUserId;
                return (
                  <div 
                    key={student.id}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '10px 0', 
                      borderBottom: '1px solid #e2e8f0',
                      background: isMe ? '#f8f7ff' : 'transparent',
                      fontWeight: isMe ? 'bold' : 'normal'
                    }}
                  >
                    <div>
                      <span style={{ color: '#64748b', marginRight: '10px' }}>#{index + 1}</span>
                      <span>{student.name} {isMe ? '(Vous)' : ''}</span>
                    </div>
                    <div>
                      <span style={{ color: '#6C63FF' }}>{student.xp} XP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EtudiantNotes;