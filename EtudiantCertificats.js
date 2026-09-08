// src/pages/EtudiantCertificats.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

// المستخدم الحالي
const currentUserId = 2; // Sameh

function EtudiantCertificats() {
  const navigate = useNavigate();
  const currentUser = DB.users.find(u => u.id === currentUserId);

  // جلب الشهادات الخاصة بهذا المستخدم
  const userCertificates = DB.certificates?.filter(c => c.userId === currentUserId) || [];

  // دالة محاكاة طباعة/تنزيل الشهادة
  const handleDownload = (cert) => {
    // في نظام حقيقي، هنا نقوم بإنشاء ملف PDF. سنقوم بمحاكاة ذلك بطباعة الصفحة.
    alert(`📄 Téléchargement du certificat pour le cours : "${cert.courseTitle}"`);
    // هنا يمكن وضع window.print() لطباعة الشهادة، لكننا سنكتفي بالتنبيه حالياً.
  };

  // دالة تنسيق التاريخ
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="certificats" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Certificats</h1>
          <p style={{ fontSize: '15px', color: '#64748b' }}>Prouvez vos accomplissements. ({userCertificates.length} certificats)</p>
        </div>

        {userCertificates.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            color: '#94a3b8', 
            background: '#fff', 
            borderRadius: '20px', 
            border: '1px solid #e2e8f0' 
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎓</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Aucun certificat pour le moment</h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Terminez un cours à 100% pour obtenir votre premier certificat.
            </p>
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
              Voir mes cours →
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {userCertificates.map((cert) => (
              <div 
                key={cert.id} 
                style={{ 
                  background: '#fff', 
                  borderRadius: '20px', 
                  border: '1px solid #e2e8f0', 
                  padding: '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                {/* أيقونة الشهادة */}
                <div style={{ 
                  background: '#6C63FF', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '28px', 
                  color: '#fff', 
                  marginBottom: '16px',
                  boxShadow: '0 4px 12px rgba(108, 99, 255, 0.3)'
                }}>
                  🏆
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
                  Certificat de réussite
                </h3>
                
                <div style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>Décerné à</p>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>{currentUser?.name}</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>Pour avoir terminé le cours</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#6C63FF', margin: '4px 0' }}>{cert.courseTitle}</p>
                </div>

                <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                  🗓️ {formatDate(cert.date)}
                </div>

                <button 
                  onClick={() => handleDownload(cert)}
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    background: '#6C63FF', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '10px', 
                    fontWeight: '500', 
                    cursor: 'pointer', 
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  📄 Télécharger le certificat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EtudiantCertificats;