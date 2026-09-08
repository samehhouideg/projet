// src/pages/ProfCourseDetails.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

// المكون الرئيسي (واجهة التوجيه)
function ProfCourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = parseInt(id);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="courses" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <CourseDetailsEngine courseId={courseId} navigate={navigate} />
      </div>
    </div>
  );
}

// ==========================================
// هذا المكون الداخلي يستخدم Class Component
// وهو لا يحتوي على أي Hooks (useState)
// ==========================================
class CourseDetailsEngine extends React.Component {
  constructor(props) {
    super(props);
    
    // البحث عن الكورس
    const foundCourse = DB.courses.find(c => c.id === props.courseId);
    
    // إذا لم يتم العثور على الكورس، نضع الحالة على null
    this.state = {
      course: foundCourse || null,
      isEditing: false,
      formData: {
        title: foundCourse?.title || '',
        description: foundCourse?.description || '',
        category: foundCourse?.category || 'Python',
        hours: foundCourse?.hours || 10,
        chapters: foundCourse?.chapters || 5
      }
    };
  }

  // دالة حفظ التعديلات
  handleSave = () => {
    const { courseId } = this.props;
    const { formData } = this.state;

    const updatedCourses = DB.courses.map(c => 
      c.id === courseId ? { ...c, ...formData } : c
    );
    DB.courses = updatedCourses;
    
    this.setState({
      course: { ...this.state.course, ...formData },
      isEditing: false
    });
    alert('✅ Cours modifié avec succès !');
  };

  // دالة حذف الكورس
  handleDelete = () => {
    const { courseId, navigate } = this.props;
    const { course } = this.state;

    if (window.confirm(`Voulez-vous supprimer définitivement "${course?.title}" ?`)) {
      const updatedCourses = DB.courses.filter(c => c.id !== courseId);
      DB.courses = updatedCourses;
      alert('🗑️ Cours supprimé.');
      navigate('/dashboard/professeur/courses');
    }
  };

  // دالة تغيير الحقول
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: { ...this.state.formData, [name]: value }
    });
  };

  render() {
    const { course, isEditing, formData } = this.state;
    const { navigate } = this.props;

    // إذا كان الكورس غير موجود
    if (!course) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>❌ Cours introuvable</h2>
          <button onClick={() => navigate('/dashboard/professeur/courses')} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
            Retour à la liste
          </button>
        </div>
      );
    }

    return (
      <div>
        <button onClick={() => navigate('/dashboard/professeur/courses')} style={{ background: 'transparent', border: 'none', color: '#6C63FF', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Retour</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>{course.title}</h1>
          <div>
            {!isEditing && (
              <>
                <button onClick={() => this.setState({ isEditing: true })} style={{ background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px' }}>✏️ Modifier</button>
                <button onClick={this.handleDelete} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>🗑️ Supprimer</button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: '#6C63FF' }}>Modifier le cours</h3>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Titre</label>
              <input type="text" name="title" value={formData.title} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Description</label>
              <textarea name="description" value={formData.description} onChange={this.handleChange} rows="4" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Catégorie</label>
              <select name="category" value={formData.category} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="Développement Web">Développement Web</option>
                <option value="Base de données">Base de données</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Heures</label>
                <input type="number" name="hours" value={formData.hours} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Chapitres</label>
                <input type="number" name="chapters" value={formData.chapters} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={this.handleSave} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>Enregistrer</button>
              <button onClick={() => this.setState({ isEditing: false })} style={{ background: 'transparent', border: '1px solid #d1d5db', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Annuler</button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>{course.description}</p>
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', gap: '24px' }}>
              <div><span style={{ color: '#64748b' }}>Catégorie</span><div style={{ fontWeight: '500' }}>{course.category}</div></div>
              <div><span style={{ color: '#64748b' }}>Heures</span><div style={{ fontWeight: '500' }}>{course.hours}h</div></div>
              <div><span style={{ color: '#64748b' }}>Chapitres</span><div style={{ fontWeight: '500' }}>{course.chapters}</div></div>
              <div><span style={{ color: '#64748b' }}>Étudiants</span><div style={{ fontWeight: '500' }}>{course.students}</div></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProfCourseDetails;