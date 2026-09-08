// src/pages/EtudiantDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

function EtudiantDashboard() {
  const navigate = useNavigate();

  // ✅ قراءة معرف المستخدم والاسم من localStorage
  const currentUserId = parseInt(localStorage.getItem('userId')) || 2; // إذا لم يوجد، افتراضي 2
  const userName = localStorage.getItem('userName') || 'Étudiant';

  // --- 1. جلب بيانات المستخدم الحقيقي ---
  const user = DB.users.find(u => u.id === currentUserId);
  const userXP = user?.xp || 0;

  // --- 2. جلب كورسات الطالب (التي بدأها) ---
  const studentCourses = DB.courses.filter(c => c.progress > 0);
  const totalCoursesStarted = studentCourses.length;

  // --- 3. حساب متوسط التقدم ---
  const averageProgress = studentCourses.length > 0
    ? Math.round(studentCourses.reduce((acc, c) => acc + c.progress, 0) / studentCourses.length)
    : 0;

  // --- 4. جلب عدد الشهادات ---
  const userCertificates = DB.certificates?.filter(c => c.userId === currentUserId) || [];
  const certCount = userCertificates.length;

  // --- 5. جلب آخر 3 إنجازات ---
  const achievements = DB.achievements
    ?.filter(a => a.userId === currentUserId)
    .slice(-3)
    .reverse() || [];

  // --- 6. آخر كورس تم العمل عليه ---
  const lastCourse = studentCourses
    .sort((a, b) => a.id - b.id)
    .pop();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="dashboard" />
      
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Bienvenue, {userName} 👋</h1>
          <p style={{ fontSize: '15px', color: '#64748b' }}>Voici un aperçu de votre progression et de vos activités récentes.</p>
        </div>

        {/* بطاقة الإحصائيات السريعة */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '30px' }}>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ color: '#64748b', fontSize: '13px' }}>📚 Cours commencés</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>{totalCoursesStarted}</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ color: '#64748b', fontSize: '13px' }}>📈 Progression moyenne</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#6C63FF' }}>{averageProgress}%</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ color: '#64748b', fontSize: '13px' }}>⭐ Points XP</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>{userXP}</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ color: '#64748b', fontSize: '13px' }}>🎓 Certificats</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#22c55e' }}>{certCount}</div>
          </div>
        </div>

        {/* آخر كورس تمت متابعته */}
        {lastCourse && (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>▶ Dernier cours suivi</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '4px 0' }}>{lastCourse.title}</h3>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Progression : {lastCourse.progress}%</div>
            </div>
            <button onClick={() => navigate(`/dashboard/etudiant/courses/${lastCourse.id}`)} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
              Continuer →
            </button>
          </div>
        )}

        {/* الإنجازات والأنشطة الحديثة */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>🏆 Derniers accomplissements</h3>
            {achievements.length === 0 ? (
              <p style={{ color: '#64748b' }}>Commencez vos cours pour gagner vos premiers points XP.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {achievements.map((ach, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px' }}>
                    <span style={{ fontSize: '20px' }}>
                      {ach.type === 'lesson_completed' ? '📖' : ach.type === 'course_completed' ? '🎓' : ach.type === 'quiz_passed' ? '🧪' : '💻'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500' }}>
                        {ach.type === 'lesson_completed' ? 'Leçon terminée' : 
                         ach.type === 'course_completed' ? 'Cours terminé !' : 
                         ach.type === 'quiz_passed' ? 'Quiz réussi !' : 'TP soumis'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>+{ach.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>⚡ Actions rapides</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => navigate('/dashboard/etudiant/courses')} style={{ width: '100%', padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: '500', color: '#475569' }}>
                📚 Voir tous les cours
              </button>
              <button onClick={() => navigate('/dashboard/etudiant/quiz')} style={{ width: '100%', padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: '500', color: '#475569' }}>
                📝 Faire un quiz
              </button>
              <button onClick={() => navigate('/dashboard/etudiant/profile')} style={{ width: '100%', padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: '500', color: '#475569' }}>
                👤 Modifier mon profil
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EtudiantDashboard;