// src/pages/AdminAnnouncements.js
import React, { useState } from 'react';
import { DB } from '../data';
import AdminSidebar from '../components/AdminSidebar';

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(DB.announcements || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    target: 'Tous',
    date: new Date().toISOString().split('T')[0]
  });

  // --- دوال CRUD ---

  // 1. فتح نافذة الإضافة
  const handleOpenAddModal = () => {
    setFormData({ title: '', content: '', target: 'Tous', date: new Date().toISOString().split('T')[0] });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  // 2. فتح نافذة التعديل
  const handleOpenEditModal = (announcement) => {
    setCurrentId(announcement.id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      target: announcement.target,
      date: announcement.date
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // 3. حفظ (إضافة أو تعديل)
  const handleSave = () => {
    if (formData.title.trim() === '' || formData.content.trim() === '') {
      alert('Veuillez remplir le titre et le contenu.');
      return;
    }

    let updatedAnnouncements = [...announcements];

    if (isEditMode) {
      // تعديل
      updatedAnnouncements = updatedAnnouncements.map(a => 
        a.id === currentId ? { ...a, ...formData } : a
      );
    } else {
      // إضافة جديدة
      const newId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;
      const newAnnouncement = {
        id: newId,
        ...formData,
        createdAt: new Date().toISOString()
      };
      updatedAnnouncements.push(newAnnouncement);
    }

    DB.announcements = updatedAnnouncements;
    setAnnouncements(updatedAnnouncements);
    setIsModalOpen(false);
    alert(isEditMode ? '✅ Annonce modifiée avec succès !' : '✅ Annonce publiée avec succès !');
  };

  // 4. حذف
  const handleDelete = (id, title) => {
    if (window.confirm(`Voulez-vous supprimer l'annonce "${title}" ?`)) {
      const updatedAnnouncements = announcements.filter(a => a.id !== id);
      DB.announcements = updatedAnnouncements;
      setAnnouncements(updatedAnnouncements);
    }
  };

  // 5. تنسيق التاريخ
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar activeTab="announcements" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Annonces</h1>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Diffusez des messages ciblés. ({announcements.length} annonces)</p>
          </div>
          <button 
            onClick={handleOpenAddModal}
            style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}
          >
            + Nouvelle annonce
          </button>
        </div>

        {announcements.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📢</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Aucune annonce</h3>
            <p>Commencez par créer votre première annonce.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {announcements.map((announcement) => (
              <div key={announcement.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{announcement.title}</h3>
                      <span style={{ 
                        background: announcement.target === 'Tous' ? '#6C63FF' : announcement.target === 'Étudiants' ? '#22c55e' : '#f59e0b',
                        color: '#fff', 
                        padding: '2px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '500'
                      }}>
                        {announcement.target}
                      </span>
                      <span style={{ fontSize: '13px', color: '#94a3b8' }}>🗓️ {formatDate(announcement.date)}</span>
                    </div>
                    <p style={{ marginTop: '8px', color: '#475569', lineHeight: '1.6' }}>{announcement.content}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleOpenEditModal(announcement)} style={{ background: '#f1f5f9', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
                    <button onClick={() => handleDelete(announcement.id, announcement.title)} style={{ background: '#fef2f2', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#ef4444' }}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Modal (إضافة / تعديل) ===== */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              {isEditMode ? 'Modifier l\'annonce' : 'Publier une nouvelle annonce'}
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>Titre</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Nouveau cours disponible" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>Contenu</label>
              <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows="4" placeholder="Détails de l'annonce..." style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', resize: 'vertical' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>Cible</label>
              <select value={formData.target} onChange={(e) => setFormData({ ...formData, target: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                <option value="Tous">Tous les utilisateurs</option>
                <option value="Étudiants">Étudiants seulement</option>
                <option value="Professeurs">Professeurs seulement</option>
              </select>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>Date de publication</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'transparent', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleSave} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#6C63FF', color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAnnouncements;