// src/pages/AdminCourses.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import AdminSidebar from '../components/AdminSidebar';

function AdminCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(DB.courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const allCategories = ['Tous', ...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(c => 
    (c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.author.toLowerCase().includes(searchTerm.toLowerCase())) && 
    (activeCategory === 'Tous' || c.category === activeCategory)
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar activeTab="courses" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Catalogue de cours</h1>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {allCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ background: activeCategory === cat ? '#6C63FF' : '#fff', color: activeCategory === cat ? '#fff' : '#475569', border: '1px solid #e2e8f0', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer' }}>{cat}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredCourses.map((course) => (
            <div key={course.id} onClick={() => navigate(`/dashboard/admin/courses/${course.id}`)} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
              <div style={{ height: '120px', background: course.image, padding: '16px', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '12px', left: '16px', background: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{course.category}</div>
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600' }}>{course.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>Par {course.author}</p>
                <p style={{ fontSize: '14px', color: '#475569', height: '60px', overflow: 'hidden' }}>{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminCourses;