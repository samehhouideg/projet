// src/pages/AdminCategories.js
import React, { useState } from 'react';
import { DB } from '../data';
import AdminSidebar from '../components/AdminSidebar';

function AdminCategories() {
  const [categories, setCategories] = useState(DB.categories || []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', icon: '📂', color: '#6C63FF' });

  const getCourseCount = (categoryName) => DB.courses.filter(c => c.category === categoryName).length;

  const handleAddCategory = () => {
    if (formData.name.trim() === '') return alert('Veuillez entrer un nom.');
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const newCat = { id: newId, name: formData.name, icon: formData.icon, color: formData.color };
    DB.categories.push(newCat);
    setCategories([...categories, newCat]);
    setShowAddModal(false);
    setFormData({ name: '', icon: '📂', color: '#6C63FF' });
  };

  const handleDeleteCategory = (id, name) => {
    if (getCourseCount(name) > 0) return alert(`❌ Impossible, ${getCourseCount(name)} cours existent.`);
    if (window.confirm(`Supprimer "${name}" ?`)) {
      const updated = categories.filter(c => c.id !== id);
      DB.categories = updated;
      setCategories(updated);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar activeTab="categories" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Gestion des Catégories</h1>
          <button onClick={() => setShowAddModal(true)} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>+ Nouvelle</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '32px' }}>{cat.icon}</div>
                  <div><h3 style={{ fontSize: '16px', fontWeight: '600' }}>{cat.name}</h3><p style={{ fontSize: '13px', color: '#64748b' }}>{getCourseCount(cat.name)} cours</p></div>
                </div>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: cat.color }}></div>
              </div>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button onClick={() => alert('✏️ Édition (V2)')} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✏️</button>
                <button onClick={() => handleDeleteCategory(cat.id, cat.name)} style={{ background: '#fef2f2', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal Add ... (باقي الكود مختصر) */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', width: '400px' }}>
            <h2 style={{ fontWeight: 'bold' }}>Ajouter une catégorie</h2>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Nom" style={{ width: '100%', padding: '10px', margin: '12px 0', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'transparent' }}>Annuler</button>
              <button onClick={handleAddCategory} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#6C63FF', color: '#fff', cursor: 'pointer' }}>Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;