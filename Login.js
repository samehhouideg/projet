// src/pages/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data'; // ✅ استيراد قاعدة البيانات

function Login() {
  // ✅ تعريف جميع المتغيرات في البداية
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // البحث عن المستخدم في قاعدة البيانات
    const user = DB.users.find(u => u.email === email && u.password === password);

    if (user) {
      // ✅ تخزين معلومات المستخدم الحقيقي
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userRole', user.role);

      // التوجيه حسب الدور
      if (user.role === 'admin') {
        navigate('/dashboard/admin');
      } else if (user.role === 'etudiant') {
        navigate('/dashboard/etudiant');
      } else if (user.role === 'professeur') {
        navigate('/dashboard/professeur');
      } else {
        setError('Rôle non reconnu');
      }
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  // ✅ التصميم الجميل لصفحة الدخول
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      
      {/* القسم الأيسر (الترحيب) */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #e0eaff 0%, #f0f4ff 100%)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e' }}>
            <div style={{ background: '#6C63FF', borderRadius: '8px', padding: '6px 8px', color: '#fff' }}>🎓</div>
            EduLearnpro
          </div>
          <div style={{ marginTop: '100px' }}>
            <h1 style={{ fontSize: '48px', color: '#1a1a2e', lineHeight: '1.2' }}>Rejoignez la communauté <span style={{ color: '#6C63FF' }}>dynamique.</span></h1>
            <p style={{ fontSize: '18px', color: '#666', marginTop: '20px', maxWidth: '450px' }}>Accédez à des cours, quiz, TP interactifs et suivez votre progression.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '16px', fontWeight: 'bold' }}>
          <span>1280+ étudiants</span> <span>47 cours</span> <span>87% réussite</span>
        </div>
      </div>

      {/* القسم الأيمن (نموذج الدخول) */}
      <div style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ marginBottom: '20px', color: '#666', cursor: 'pointer' }} onClick={() => navigate('/')}>← Retour</div>
        
        <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', padding: '40px' }}>
          
          <div style={{ display: 'flex', background: '#f8f9fa', borderRadius: '12px', padding: '4px', marginBottom: '30px' }}>
            <button style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', fontWeight: '500' }}>Se connecter</button>
            <button onClick={() => navigate('/register')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: 'transparent', fontWeight: '500', cursor: 'pointer' }}>Créer un compte</button>
          </div>

          {error && <div style={{ color: '#dc2626', textAlign: 'center', marginBottom: '10px', fontWeight: '500', background: '#fef2f2', padding: '8px', borderRadius: '8px' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Email</label>
              <input type="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '15px' }} />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '15px' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '15px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;  