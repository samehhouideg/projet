// src/pages/ProfCalendrier.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

function ProfCalendrier() {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(DB.calendarEvents || []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="calendrier" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Calendrier</h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>Gérez vos séances, examens et événements.</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#fff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <button onClick={prevMonth} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6C63FF' }}>‹</button>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>{monthNames[month]} {year}</h2>
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
                    <span style={{ fontWeight: '600', color: isToday ? '#6C63FF' : '#0f172a', background: isToday ? '#e8e4ff' : 'transparent', padding: isToday ? '2px 8px' : '0', borderRadius: '12px' }}>{day}</span>
                    {isToday && <span style={{ fontSize: '10px', color: '#6C63FF', fontWeight: '600' }}>Aujourd'hui</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {dayEvents.map(event => (
                      <div key={event.id} style={{ background: '#6C63FF', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '500' }}>
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfCalendrier;
