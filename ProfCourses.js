// src/pages/ProfCourses.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

const currentUserId = 5; // Prof Karim

function ProfCourses() {
  const navigate = useNavigate();
  
  // جلب الكورسات الحقيقية من قاعدة البيانات
  const [courses, setCourses] = useState(DB.courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // --- نموذج إضافة كورس جديد ---
  const [newCourse, setNewCourse] = useState({
    title: '',
    author: localStorage.getItem('userName') || 'Prof',
    description: '',
    category: 'Python',
    hours: 10,
    chapters: 5,
    image: 'linear-gradient(135deg, #6C63FF 0%, #a18cd1 100%)',
    progress: 0,
    favorite: false,
    lessons: []
  });

  // ✅ دالة إضافة كورس جديدة (مع منع التكرار)
  const handleAddCourse = () => {
    if (newCourse.title.trim() === '' || newCourse.description.trim() === '') {
      alert('Veuillez remplir le titre et la description.');
      return;
    }

    // التحقق من عدم وجود كورس بنفس العنوان
    const existingCourse = courses.find(c => c.title.toLowerCase() === newCourse.title.toLowerCase());
    if (existingCourse) {
      alert('⚠️ Un cours avec ce titre existe déjà.');
      return;
    }

    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const courseToAdd = { ...newCourse, id: newId, students: 0 };
    
    // تحديث قاعدة البيانات (مرة واحدة فقط)
    DB.courses.push(courseToAdd);
    
    // تحديث الحالة (يظهر فوراً بدون تكرار)
    setCourses([...courses, courseToAdd]);
    
    setShowAddModal(false);
    setNewCourse({
      title: '',
      author: localStorage.getItem('userName') || 'Prof',
      description: '',
      category: 'Python',
      hours: 10,
      chapters: 5,
      image: 'linear-gradient(135deg, #6C63FF 0%, #a18cd1 100%)',
      progress: 0,
      favorite: false,
      lessons: []
    });
    alert('✅ Cours ajouté avec succès !');
  };

  // --- دالة حذف كورس ---
  const handleDeleteCourse = (courseId, courseTitle) => {
    if (window.confirm(`Voulez-vous supprimer définitivement le cours "${courseTitle}" ?`)) {
      const updatedCourses = courses.filter(c => c.id !== courseId);
      DB.courses = updatedCourses;
      setCourses(updatedCourses);
      alert('🗑️ Cours supprimé avec succès.');
    }
  };

  // الفلترة
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="courses" />
      
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Mes cours</h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Gérez vos cours. ({courses.length} cours)</p>
          </div>
          <button onClick={() => setShowAddModal(true)} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
            + Nouveau cours
          </button>
        </div>

        {/* شريط البحث */}
        <div style={{ marginBottom: '24px', background: '#fff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ color: '#94a3b8', marginRight: '12px' }}>🔍</span>
          <input type="text" placeholder="Rechercher un cours..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '15px', background: 'transparent' }} />
        </div>

        {/* شبكة الكورسات */}
        {filteredCourses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Aucun cours trouvé</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredCourses.map((course) => (
              <div key={course.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ height: '100px', background: course.image, borderRadius: '12px', marginBottom: '16px', position: 'relative' }}>
                  {/* زر الحذف */}
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id, course.title); }} style={{ position: 'absolute', top: '8px', right: '8px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '14px' }}>
                    🗑️
                  </button>
                </div>
                <div onClick={() => navigate(`/dashboard/professeur/courses/${course.id}`)} style={{ cursor: 'pointer' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>{course.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>Par {course.author}</p>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>{course.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>{course.students} étudiants</span>
                    <span style={{ background: '#f1f5f9', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: '#475569' }}>{course.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === نافذة إضافة كورس (Modal) === */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Ajouter un cours</h2>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Titre du cours</label>
              <input type="text" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Description</label>
              <textarea value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} rows="3" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Catégorie</label>
                <select value={newCourse.category} onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="Développement Web">Développement Web</option>
                  <option value="Base de données">Base de données</option>
                  <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                  <option value="Développement Mobile">Développement Mobile</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Nombre d'heures</label>
                <input type="number" value={newCourse.hours} onChange={(e) => setNewCourse({ ...newCourse, hours: parseInt(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'transparent', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleAddCourse} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#6C63FF', color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfCourses;