// src/pages/EtudiantCourseDetails.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

function EtudiantCourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = parseInt(id);

  // البحث عن الكورس في قاعدة البيانات
  const foundCourse = DB.courses.find(c => c.id === courseId);
  
  if (!foundCourse) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cours introuvable.</div>;
  }

  // حالات العرض
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [course, setCourse] = useState(foundCourse);
  const lessons = course.lessons || [];

  // دالة التنقل بين الدروس وزيادة التقدم
  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      
      // تحديث التقدم بناءً على عدد الدروس التي تم مشاهدتها
      const newProgress = Math.round(((currentLessonIndex + 2) / lessons.length) * 100);
      const updatedCourses = DB.courses.map(c => 
        c.id === courseId ? { ...c, progress: Math.min(newProgress, 100) } : c
      );
      DB.courses = updatedCourses;
      setCourse({ ...course, progress: Math.min(newProgress, 100) });
    } else {
      alert('🎉 Félicitations ! Vous avez terminé ce cours !');
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  // تقدم المستخدم بناءً على الدروس المشاهدة
  const progress = course.progress || 0;
  const currentLesson = lessons[currentLessonIndex];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="courses" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* زر العودة */}
        <button 
          onClick={() => navigate('/dashboard/etudiant/courses')}
          style={{ background: 'transparent', border: 'none', color: '#6C63FF', fontSize: '14px', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          ← Retour au catalogue
        </button>

        {/* رأس الكورس */}
        <div style={{ height: '160px', background: course.image, borderRadius: '16px', marginBottom: '24px', position: 'relative', padding: '24px' }}>
          <h1 style={{ position: 'absolute', bottom: '24px', left: '24px', color: '#fff', fontSize: '28px', fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {course.title}
          </h1>
        </div>

        {/* معلومات الكورس */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{course.title}</h2>
              <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Par {course.author}</p>
            </div>
            <span style={{ background: '#f1f5f9', padding: '4px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', color: '#475569' }}>
              🏷️ {course.category}
            </span>
          </div>
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
            <div><span style={{ color: '#64748b', display: 'block', fontSize: '12px' }}>Durée</span><span style={{ fontWeight: '600', fontSize: '16px' }}>{course.hours}h</span></div>
            <div><span style={{ color: '#64748b', display: 'block', fontSize: '12px' }}>Étudiants</span><span style={{ fontWeight: '600', fontSize: '16px' }}>{course.students}</span></div>
            <div><span style={{ color: '#64748b', display: 'block', fontSize: '12px' }}>Progression</span><span style={{ fontWeight: '600', fontSize: '16px', color: '#6C63FF' }}>{progress}%</span></div>
          </div>
        </div>

        {/* شريط التقدم الحقيقي */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
            <span>Progression du cours</span>
            <span>{progress}%</span>
          </div>
          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(to right, #6C63FF, #a78bfa)', borderRadius: '4px', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        {/* محتوى الدرس الحالي */}
        {currentLesson ? (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', minHeight: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>📖 {currentLesson.title}</h3>
              <span style={{ background: '#e2e8f0', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', color: '#64748b' }}>
                Leçon {currentLessonIndex + 1} / {lessons.length}
              </span>
            </div>
            <div style={{ lineHeight: '1.8', color: '#475569', fontSize: '15px' }}>
              {currentLesson.content}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            Ce cours ne contient pas encore de leçons.
          </div>
        )}

        {/* أزرار التنقل بين الدروس */}
        {lessons.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', gap: '12px' }}>
            <button 
              onClick={handlePrevLesson}
              disabled={currentLessonIndex === 0}
              style={{ 
                padding: '12px 24px', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                background: currentLessonIndex === 0 ? '#f1f5f9' : '#fff', 
                color: currentLessonIndex === 0 ? '#94a3b8' : '#0f172a', 
                cursor: currentLessonIndex === 0 ? 'not-allowed' : 'pointer',
                fontWeight: '500'
              }}
            >
              ← Précédent
            </button>
            <button 
              onClick={handleNextLesson}
              disabled={currentLessonIndex === lessons.length - 1 && progress === 100}
              style={{ 
                padding: '12px 24px', 
                borderRadius: '12px', 
                border: 'none', 
                background: '#6C63FF', 
                color: '#fff', 
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {currentLessonIndex === lessons.length - 1 ? '🎉 Terminer' : 'Suivant →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EtudiantCourseDetails;