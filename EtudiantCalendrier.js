// src/pages/EtudiantCalendrier.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

function EtudiantCalendrier() {
  const navigate = useNavigate();

  // --- 1. الحالة الأساسية ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(DB.calendarEvents || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    type: 'exam'
  });

  // --- 2. دوال التقويم ---
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // --- 3. دوال التنقل بين الأشهر ---
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // --- 4. دالة التحقق من وجود حدث في يوم معين (مع إزالة التكرار) ---
  const getEventsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // ✅ استخدام Set لإزالة الأحداث المكررة بناءً على الـ id
    const uniqueEvents = events.filter((event, index, self) => 
      index === self.findIndex((t) => t.id === event.id)
    );
    
    return uniqueEvents.filter(e => e.date === dateStr);
  };

  // --- 5. دالة إضافة حدث جديد ---
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert('Veuillez remplir le titre et la date.');
      return;
    }
    
    // ✅ التحقق من عدم وجود حدث بنفس العنوان والتاريخ
    const existingEvent = events.find(e => 
      e.title === newEvent.title && e.date === newEvent.date
    );
    if (existingEvent) {
      alert('⚠️ Cet événement existe déjà.');
      return;
    }
    
    const eventToAdd = {
      id: Date.now(),
      ...newEvent
    };
    
    if (!DB.calendarEvents) {
      DB.calendarEvents = [];
    }
    DB.calendarEvents.push(eventToAdd);
    setEvents([...events, eventToAdd]);
    setIsModalOpen(false);
    setNewEvent({ title: '', date: '', description: '', type: 'exam' });
    alert('✅ Événement ajouté !');
  };

  // --- 6. دالة حذف حدث ---
  const handleDeleteEvent = (id) => {
    if (window.confirm('Voulez-vous supprimer cet événement ?')) {
      const updatedEvents = events.filter(e => e.id !== id);
      if (DB.calendarEvents) {
        DB.calendarEvents = updatedEvents;
      }
      setEvents(updatedEvents);
    }
  };

  // --- 7. إعدادات التقويم ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  // --- 8. تحديد لون الحدث حسب النوع ---
  const getEventColor = (type) => {
    switch(type) {
      case 'exam': return '#ef4444';
      case 'homework': return '#f59e0b';
      case 'live': return '#3b82f6';
      case 'quiz': return '#8b5cf6';
      default: return '#6C63FF';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="calendrier" />
      
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Calendrier</h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Séances, examens et devoirs.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>+ Ajouter</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#fff', padding: '16px 24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <button onClick={prevMonth} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6C63FF' }}>‹</button>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{monthNames[month]} {year}</h2>
          <button onClick={nextMonth} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6C63FF' }}>›</button>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#64748b' }}>{day}</div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
              <div key={`empty-${i}`} style={{ padding: '12px', minHeight: '100px', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

              return (
                <div key={day} style={{ padding: '12px', minHeight: '100px', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', background: isToday ? '#f8f7ff' : '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: isToday ? '#6C63FF' : '#0f172a', background: isToday ? '#e8e4ff' : 'transparent', padding: isToday ? '2px 8px' : '0', borderRadius: '12px' }}>
                      {day}
                    </span>
                    {isToday && <span style={{ fontSize: '10px', color: '#6C63FF', fontWeight: '600' }}>Aujourd'hui</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {dayEvents.map(event => (
                      <div key={event.id} style={{ background: getEventColor(event.type), color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => handleDeleteEvent(event.id)}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80px' }}>{event.title}</span>
                        <span style={{ fontSize: '10px', opacity: 0.8 }}>✕</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== نافذة إضافة حدث (Modal) ===== */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Ajouter un événement</h2>
            <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>Titre</label><input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Ex: Examen React" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }} /></div>
            <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>Date</label><input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }} /></div>
            <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>Description</label><textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} rows="3" placeholder="Détails..." style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', resize: 'vertical' }} /></div>
            <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>Type</label><select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }}><option value="exam">📝 Examen</option><option value="homework">📚 Devoir</option><option value="live">🎥 Live</option><option value="quiz">🧪 Quiz</option></select></div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'transparent', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleAddEvent} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#6C63FF', color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EtudiantCalendrier;