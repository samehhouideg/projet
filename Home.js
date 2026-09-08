// src/pages/Home.js
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #e0eaff 0%, #f0f4ff 100%)',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      {/* شريط التنقل */}
      <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e' }}>
          <div style={{ background: '#6C63FF', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>🎓</div>
          EduLearnpro
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: 'none', fontSize: '16px', fontWeight: '500', color: '#1a1a2e', cursor: 'pointer' }}>Se connecter</button>
          <button onClick={() => navigate('/register')} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '50px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Créer un compte</button>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
        <h1 style={{ fontSize: '56px', color: '#1a1a2e', marginBottom: '20px', lineHeight: '1.2' }}>
          Rejoignez la communauté <br /> d'apprenants la plus <span style={{ color: '#6C63FF' }}>dynamique.</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.6' }}>
          Accédez à des cours, quiz, TP interactifs et suivez votre progression en temps réel avec <b>EduLearnpro</b>.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => navigate('/register')} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '16px 40px', borderRadius: '50px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 30px rgba(108, 99, 255, 0.3)' }}>Commencer gratuitement →</button>
          <button style={{ background: 'transparent', color: '#1a1a2e', border: '2px solid #e5e7eb', padding: '16px 40px', borderRadius: '50px', fontSize: '18px', fontWeight: '600', cursor: 'pointer' }}>Voir les cours</button>
        </div>
        <div style={{ display: 'flex', gap: '50px', marginTop: '60px', fontSize: '18px', fontWeight: 'bold', color: '#1a1a2e' }}>
          <div><span style={{ color: '#6C63FF', fontSize: '24px' }}>1280+</span> <br /> Étudiants</div>
          <div><span style={{ color: '#6C63FF', fontSize: '24px' }}>47</span> <br /> Cours</div>
          <div><span style={{ color: '#6C63FF', fontSize: '24px' }}>87%</span> <br /> Réussite</div>
        </div>
      </div>
    </div>
  );
}

export default Home;