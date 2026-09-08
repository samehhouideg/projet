// src/pages/EtudiantTP.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

const currentUserId = 2; // Sameh

function EtudiantTP() {
  const navigate = useNavigate();
  const [selectedTP, setSelectedTP] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // اختيار TP
  const startTP = (tp) => {
    setSelectedTP(tp);
    setCode(tp.starterCode || '');
    setOutput('');
    setSubmitted(false);
  };

  // تشغيل الكود (محاكاة)
  const runCode = () => {
    setOutput('⏳ Exécution en cours...');
    setTimeout(() => {
      if (code.includes('print')) {
        setOutput('>>> Le code a été exécuté avec succès !\n(Sortie simulée)');
      } else {
        setOutput('❌ Erreur : Aucune instruction print trouvée.');
      }
    }, 1000);
  };

  // تسليم TP
  const submitTP = () => {
    const user = DB.users.find(u => u.id === currentUserId);
    if (user) {
      user.xp += selectedTP.xp;
      DB.achievements.push({
        userId: currentUserId,
        type: 'tp_submitted',
        tpId: selectedTP.id,
        xp: selectedTP.xp
      });
    }
    setSubmitted(true);
    setOutput(`✅ TP soumis avec succès ! (+${selectedTP.xp} XP)`);
  };

  // العودة للقائمة
  const goBack = () => {
    setSelectedTP(null);
    setCode('');
    setOutput('');
    setSubmitted(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="tp" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Travaux Pratiques (TP)</h1>

        {!selectedTP ? (
          // عرض قائمة TP
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {DB.tps.map((tp) => (
              <div key={tp.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{tp.title}</h3>
                <p style={{ color: '#64748b' }}>{tp.description}</p>
                <p style={{ fontSize: '13px', color: '#6C63FF', fontWeight: '500' }}>+{tp.xp} XP</p>
                <button onClick={() => startTP(tp)} style={{ width: '100%', padding: '10px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
                  Accéder au TP
                </button>
              </div>
            ))}
          </div>
        ) : (
          // عرض محرر الكود
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{selectedTP.title}</h3>
              <button onClick={goBack} style={{ background: 'transparent', border: 'none', color: '#6C63FF', cursor: 'pointer' }}>← Retour</button>
            </div>
            <p style={{ color: '#64748b', marginBottom: '16px' }}>{selectedTP.description}</p>
            
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={submitted}
              style={{ 
                width: '100%', 
                height: '200px', 
                padding: '16px', 
                fontFamily: 'monospace', 
                fontSize: '14px', 
                background: '#1e293b', 
                color: '#e2e8f0', 
                border: 'none', 
                borderRadius: '8px', 
                resize: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button onClick={runCode} disabled={submitted} style={{ padding: '10px 20px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                ▶ Exécuter
              </button>
              <button onClick={submitTP} disabled={submitted} style={{ padding: '10px 20px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                📤 Soumettre
              </button>
            </div>

            <div style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
              {output || '💡 Le résultat apparaîtra ici après avoir cliqué sur "Exécuter".'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EtudiantTP;