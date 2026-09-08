// src/pages/EtudiantCourses.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

const currentUserId = 2; // Sameh

function EtudiantCourses() {
  const navigate = useNavigate();
  const { id } = useParams();

  if (id) {
    return <CourseDetailsView courseId={parseInt(id)} navigate={navigate} />;
  }
  return <CourseListView navigate={navigate} />;
}

export default EtudiantCourses;

// ================== قائمة الكورسات (الجزء الخاص بالتصميم) ==================
function CourseListView({ navigate }) {
  const [courses, setCourses] = useState(DB.courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');

  // استخراج التصنيفات الفريدة
  const allCategories = ['Tous', ...new Set(courses.map(c => c.category))];

  // دالة تبديل المفضلة
  const toggleFavorite = (courseId) => {
    const updated = courses.map(c => 
      c.id === courseId ? { ...c, favorite: !c.favorite } : c
    );
    DB.courses = updated;
    setCourses(updated);
  };

  // الفلترة والبحث
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // أيقونات للتصنيفات
  const categoryIcons = {
    'Python': '🐍',
    'Java': '☕',
    'Développement Web': '🌐',
    'Base de données': '🗄️',
    'Intelligence Artificielle': '🤖',
    'Développement Mobile': '📱'
  };

  // ✅ 1. جلب عدد الشهادات التي حصل عليها الطالب
  const userCertificates = DB.certificates?.filter(c => c.userId === currentUserId) || [];

  // ✅ 2. دالة للحصول على حالة الكورس
  const getCourseStatus = (progress) => {
    if (progress === 100) return { label: 'Terminé', color: '#22c55e', icon: '🟢' };
    if (progress > 0) return { label: 'En cours', color: '#f59e0b', icon: '🟡' };
    return { label: 'Non commencé', color: '#94a3b8', icon: '⚪' };
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="courses" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* العنوان + عدّاد الشهادات */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Catalogue de cours</h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Explorez, filtrez et démarrez un nouveau parcours d'apprentissage.</p>
          </div>
          <div style={{ 
            background: '#fff', 
            padding: '10px 18px', 
            borderRadius: '12px', 
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '24px' }}>🎓</span>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Certificats</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#6C63FF' }}>{userCertificates.length}</div>
            </div>
          </div>
        </div>

        {/* شريط البحث والفلتر */}
        <div style={{ 
          marginBottom: '30px', 
          background: '#fff', 
          padding: '12px 20px', 
          borderRadius: '16px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px', 
          flexWrap: 'wrap' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '200px' }}>
            <span style={{ color: '#94a3b8', marginRight: '12px', fontSize: '18px' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Rechercher un cours..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '15px', background: 'transparent', color: '#0f172a' }} 
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderLeft: '1px solid #e2e8f0', paddingLeft: '20px' }}>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? '#6C63FF' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#475569',
                  border: activeCategory === cat ? 'none' : '1px solid #e2e8f0',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {cat !== 'Tous' && (categoryIcons[cat] || '📘')} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* شبكة الكورسات */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredCourses.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              Aucun cours trouvé pour cette recherche.
            </div>
          ) : (
            filteredCourses.map((course) => {
              const status = getCourseStatus(course.progress);
              
              return (
                <div key={course.id} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                  
                  {/* 1. رأس البطاقة */}
                  <div style={{ 
                    height: '140px', 
                    background: course.image, 
                    position: 'relative', 
                    padding: '16px' 
                  }}>
                    {/* زر المفضلة */}
                    <button 
                      onClick={() => toggleFavorite(course.id)}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '18px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        color: course.favorite ? '#ef4444' : '#64748b'
                      }}
                    >
                      {course.favorite ? '❤️' : '🤍'}
                    </button>

                    {/* شارة التصنيف */}
                    <div style={{ 
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(4px)',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#0f172a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      {categoryIcons[course.category] || '📘'} {course.category}
                    </div>
                  </div>

                  {/* 2. تفاصيل الكورس */}
                  <div style={{ padding: '20px 24px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{course.title}</h3>
                      {/* ✅ 3. شارة الحالة الجديدة */}
                      <span style={{ 
                        background: status.color + '20', 
                        color: status.color, 
                        padding: '2px 10px', 
                        borderRadius: '12px', 
                        fontSize: '11px', 
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {status.icon} {status.label}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>Par {course.author}</p>
                    
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {course.description}
                    </p>

                    {/* الإحصائيات الصغيرة */}
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🕒 {course.hours}h</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>👥 {course.students}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📖 {course.chapters} chap.</span>
                    </div>

                    {/* شريط التقدم */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                        <span>Progression</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div style={{ 
                        height: '6px', 
                        background: '#e2e8f0', 
                        borderRadius: '4px', 
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            width: `${course.progress}%`, 
                            background: 'linear-gradient(to right, #6C63FF, #a78bfa)', 
                            borderRadius: '4px',
                            transition: 'width 0.5s ease'
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* زر المتابعة */}
                    <button 
                      onClick={() => navigate(`/dashboard/etudiant/courses/${course.id}`)}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        background: 'linear-gradient(90deg, #6C63FF 0%, #8B83FF 100%)', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '12px', 
                        fontWeight: '600', 
                        cursor: 'pointer', 
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(108, 99, 255, 0.3)',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      ▶ {course.progress > 0 ? 'Continuer' : 'Commencer'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ================== تفاصيل الكورس ==================
function CourseDetailsView({ courseId, navigate }) {
  const [course, setCourse] = useState(DB.courses.find(c => c.id === courseId));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  if (!course) return <div>❌ Cours introuvable</div>;

  const lessons = course.lessons || [];
  const totalLessons = lessons.length;
  const currentUser = DB.users.find(u => u.id === currentUserId);

  const handleCompleteLesson = () => {
    const lessonId = lessons[currentLessonIndex].id;
    if (completedLessons.includes(lessonId)) return;

    const newCompleted = [...completedLessons, lessonId];
    setCompletedLessons(newCompleted);

    const newProgress = Math.round((newCompleted.length / totalLessons) * 100);

    const updatedCourses = DB.courses.map(c => 
      c.id === courseId ? { ...c, progress: newProgress } : c
    );
    DB.courses = updatedCourses;
    setCourse({ ...course, progress: newProgress });

    const lessonXP = lessons[currentLessonIndex].xp || 5;
    if (currentUser) {
      currentUser.xp += lessonXP;
      if (!DB.achievements) DB.achievements = [];
      DB.achievements.push({ 
        userId: currentUserId, 
        type: 'lesson_completed', 
        courseId: courseId, 
        lessonId: lessonId,
        xp: lessonXP 
      });
    }

    if (newProgress === 100) {
      const bonusXP = 50;
      if (currentUser) {
        currentUser.xp += bonusXP;
        DB.achievements.push({ 
          userId: currentUserId, 
          type: 'course_completed', 
          courseId: courseId, 
          xp: bonusXP 
        });

        if (!DB.certificates) DB.certificates = [];
        const existingCert = DB.certificates.find(c => c.userId === currentUserId && c.courseId === courseId);
        if (!existingCert) {
          DB.certificates.push({
            id: DB.certificates.length + 1,
            userId: currentUserId,
            courseId: courseId,
            courseTitle: course.title,
            date: new Date().toISOString().split('T')[0]
          });
        }
        alert(`🎉 Félicitations ! Vous avez terminé le cours ! (+${lessonXP + bonusXP} XP) et un certificat a été généré !`);
      }
    }

    if (newProgress < 100 && currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="courses" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <button onClick={() => navigate('/dashboard/etudiant/courses')} style={{ background: 'transparent', border: 'none', color: '#6C63FF', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Retour</button>
        
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{course.title}</h1>
        <p style={{ color: '#64748b', marginBottom: '16px' }}>Par {course.author}</p>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
            <span>Progression</span>
            <span>{course.progress}%</span>
          </div>
          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${course.progress}%`, background: '#6C63FF', borderRadius: '4px', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        <div style={{ margin: '20px 0' }}>
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isCurrent = currentLessonIndex === index;
            return (
              <div key={lesson.id} style={{ padding: '16px', background: isCurrent ? '#f8f7ff' : '#fff', border: isCurrent ? '2px solid #6C63FF' : '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontWeight: '600', margin: 0 }}>{lesson.title} (+{lesson.xp} XP)</h4>
                  {isCompleted ? <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✅ Terminé</span> : <span style={{ color: '#94a3b8' }}>À faire</span>}
                </div>
                <p style={{ color: '#475569', marginTop: '8px', lineHeight: '1.6' }}>{lesson.content}</p>
              </div>
            );
          })}
        </div>

        <button onClick={handleCompleteLesson} disabled={completedLessons.includes(lessons[currentLessonIndex]?.id)} style={{ width: '100%', padding: '12px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '15px', opacity: completedLessons.includes(lessons[currentLessonIndex]?.id) ? 0.5 : 1 }}>
          {completedLessons.includes(lessons[currentLessonIndex]?.id) ? '✅ Déjà terminé' : '✔ Terminer ce chapitre'}
        </button>
      </div>
    </div>
  );
}