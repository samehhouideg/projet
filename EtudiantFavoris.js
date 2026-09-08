// src/pages/EtudiantFavoris.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

function EtudiantFavoris() {
  const navigate = useNavigate();

  // --- 1. جلب الكورسات التي تحتوي على favorite: true ---
  const [favorites, setFavorites] = useState(
    DB.courses.filter(c => c.favorite === true).map(c => ({
      ...c,
      progress: c.progress || 0,
      favorite: c.favorite || false
    }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');

  // استخراج التصنيفات الموجودة في المفضلة فقط
  const allCategories = ['Tous', ...new Set(favorites.map(c => c.category))];

  // --- 2. دالة إزالة من المفضلة (حقيقي) ---
  const removeFromFavorites = (courseId) => {
    // تحديث قاعدة البيانات
    const updatedCourses = DB.courses.map(c => 
      c.id === courseId ? { ...c, favorite: false } : c
    );
    DB.courses = updatedCourses;

    // تحديث الواجهة (إخفاء الكورس من المفضلة)
    setFavorites(favorites.filter(c => c.id !== courseId));
  };

  // --- 3. الفلترة والبحث ---
  const filteredFavorites = favorites.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      
      {/* القائمة الجانبية الخاصة بالطالب */}
      <EtudiantSidebar activeTab="favoris" />

      {/* المحتوى الرئيسي */}
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* العنوان */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Mes Favoris ❤️</h1>
          <p style={{ fontSize: '15px', color: '#64748b' }}>Retrouvez ici tous les cours que vous avez ajoutés à vos favoris. ({favorites.length} cours)</p>
        </div>

        {/* إذا كانت المفضلة فارغة */}
        {favorites.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            color: '#94a3b8', 
            background: '#fff', 
            borderRadius: '20px', 
            border: '1px solid #e2e8f0' 
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>💔</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Aucun favori pour le moment</h3>
            <p style={{ marginBottom: '20px' }}>Explorez le catalogue et ajoutez des cours à vos favoris en cliquant sur le cœur 🤍.</p>
            <button 
              onClick={() => navigate('/dashboard/etudiant/courses')}
              style={{ 
                background: '#6C63FF', 
                color: '#fff', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '12px', 
                fontWeight: '600', 
                cursor: 'pointer', 
                fontSize: '15px' 
              }}
            >
              Explorer les cours →
            </button>
          </div>
        ) : (
          <>
            {/* البحث والفلاتر */}
            <div style={{ 
              marginBottom: '30px', 
              background: '#fff', 
              padding: '12px 20px', 
              borderRadius: '16px', 
              border: '1px solid #e2e8f0', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              flexWrap: 'wrap' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '200px' }}>
                <span style={{ color: '#94a3b8', marginRight: '12px', fontSize: '18px' }}>🔍</span>
                <input 
                  type="text" 
                  placeholder="Rechercher dans mes favoris..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  style={{ 
                    width: '100%', 
                    border: 'none', 
                    outline: 'none', 
                    fontSize: '15px', 
                    background: 'transparent', 
                    color: '#0f172a' 
                  }} 
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
                      fontWeight: '500' 
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* شبكة الكورسات المفضلة */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {filteredFavorites.map((course) => (
                <div 
                  key={course.id} 
                  style={{ 
                    background: '#fff', 
                    borderRadius: '20px', 
                    overflow: 'hidden', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)', 
                    border: '1px solid #f1f5f9' 
                  }}
                >
                  {/* صورة الكورس */}
                  <div style={{ height: '140px', background: course.image, position: 'relative', padding: '16px' }}>
                    {/* زر إزالة من المفضلة */}
                    <button 
                      onClick={() => removeFromFavorites(course.id)}
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
                        color: '#ef4444' 
                      }}
                    >
                      ❤️
                    </button>
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '16px', 
                      left: '16px', 
                      background: 'rgba(255,255,255,0.95)', 
                      padding: '4px 14px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#0f172a' 
                    }}>
                      🏷️ {course.category}
                    </div>
                  </div>

                  {/* تفاصيل الكورس */}
                  <div style={{ padding: '20px 24px 24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{course.title}</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>Par {course.author}</p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#475569', 
                      lineHeight: '1.6', 
                      marginBottom: '16px', 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden' 
                    }}>
                      {course.description}
                    </p>

                    {/* الإحصائيات */}
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                      <span>🕒 {course.hours}h</span>
                      <span>👥 {course.students}</span>
                      <span>📖 {course.chapters} chap.</span>
                    </div>

                    {/* شريط التقدم */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                        <span>Progression</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${course.progress}%`, 
                          background: 'linear-gradient(to right, #6C63FF, #a78bfa)', 
                          borderRadius: '4px', 
                          transition: 'width 0.5s ease' 
                        }}></div>
                      </div>
                    </div>

                    {/* زر المتابعة (يذهب لصفحة الكورس) */}
                    <button 
                      onClick={() => navigate(`/dashboard/etudiant/courses/${course.id}`)}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        background: '#6C63FF', 
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
                        boxShadow: '0 4px 12px rgba(108, 99, 255, 0.3)' 
                      }}
                    >
                      ▶ {course.progress > 0 ? 'Continuer' : 'Commencer'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EtudiantFavoris;