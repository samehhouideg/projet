// src/pages/ProfesseurDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

// الأستاذ الحالي (للمحاكاة)
const currentUserId = 5; // Prof Karim

function ProfesseurDashboard() {
  const navigate = useNavigate();

  // --- 1. جلب بيانات الأستاذ الحقيقي ---
  const professor = DB.users.find(u => u.id === currentUserId);
  const profName = professor?.name || 'Professeur';

  // --- 2. إحصائيات حقيقية ---
  // الكورسات التي يدرسها الأستاذ (مفترض أنه يدرس الكورسات 2 و 3)
  const profCourses = DB.courses.filter(c => c.id === 2 || c.id === 3);
  const totalCourses = profCourses.length;

  // إجمالي عدد الطلاب المسجلين في كورسات الأستاذ
  const totalStudents = profCourses.reduce((acc, c) => acc + c.students, 0);

  // TP في انتظار التصحيح (افتراضي: جميع الـ TPs)
  const tpsToCorrect = DB.tps?.length || 0;

  // البيانات الوهمية للمخطط (مطابقة للصورة)
  const chartData = [120, 90, 180, 150, 280, 100, 190];
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const maxData = Math.max(...chartData);

  // --- 3. المواعيد القادمة (Prochaines séances) ---
  const upcomingSessions = [
    { id: 1, title: 'Quiz JavaScript Avancé', time: "Aujourd'hui, 14:00", icon: '📝' },
    { id: 2, title: 'TP Python — Listes & Dictionnaires', time: 'Demain, 10:00', icon: '💻' },
    { id: 3, title: 'Réunion en direct : React Hooks', time: 'Vendredi, 15:00', icon: '📞' },
    { id: 4, title: 'Examen SQL — Module 1', time: 'Lundi prochain', icon: '📝' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="dashboard" />
      
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* رأس الصفحة (العنوان + زر إضافة كورس) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Espace Professeur</h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Gérez vos cours, corrigez les TP et animez vos sessions live.</p>
          </div>
          <button onClick={() => alert('Fonctionnalité d\'ajout de cours (à venir)')} style={{ background: 'linear-gradient(90deg, #6C63FF 0%, #8B83FF 100%)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
            + Nouveau cours
          </button>
        </div>

        {/* بطاقات الإحصائيات (Stats Cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '30px' }}>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#f4f4ff', borderRadius: '12px', padding: '12px', color: '#6C63FF', fontSize: '24px' }}>📚</div>
            <div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Mes cours</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{totalCourses}</div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#f4f4ff', borderRadius: '12px', padding: '12px', color: '#6C63FF', fontSize: '24px' }}>👥</div>
            <div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Étudiants</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{totalStudents}</div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#f4f4ff', borderRadius: '12px', padding: '12px', color: '#6C63FF', fontSize: '24px' }}>📝</div>
            <div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>TP à corriger</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{tpsToCorrect}</div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#f4f4ff', borderRadius: '12px', padding: '12px', color: '#6C63FF', fontSize: '24px' }}>📅</div>
            <div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Prochaine séance</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>15:00</div>
            </div>
          </div>
        </div>

        {/* المخطط والمواعيد (قسمان متجاوران) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          
          {/* المخطط (Engagement étudiants) */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '20px' }}>Engagement étudiants</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '4px' }}>
              {chartData.map((val, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                  <div 
                    style={{ 
                      width: '80%', 
                      height: `${(val / maxData) * 100}%`, 
                      background: 'linear-gradient(to top, #6C63FF 0%, #a78bfa 100%)', 
                      borderRadius: '8px 8px 0 0',
                      transition: 'height 0.5s ease',
                      opacity: 0.9
                    }}
                  ></div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px', fontWeight: '500' }}>{days[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* المواعيد القادمة (Prochaines séances) */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '20px' }}>Prochaines séances</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingSessions.map((session) => (
                <div key={session.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px' }}>
                  <div style={{ background: '#eff6ff', padding: '8px', borderRadius: '50%', color: '#6C63FF' }}>{session.icon}</div>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '14px', color: '#0f172a' }}>{session.title}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{session.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfesseurDashboard;