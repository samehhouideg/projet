// src/pages/Register.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data'; // ✅ استيراد قاعدة البيانات (مهم جداً)

function Register() {
  const navigate = useNavigate(); // ✅ تعريف navigate
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'etudiant' });

  const handleRoleSelect = (role) => setFormData(prev => ({ ...prev, role }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ حفظ المستخدم الحقيقي في قاعدة البيانات المحلية (DB)
    const newUser = {
      id: DB.users.length + 1,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      status: 'pending', // ✅ الحساب يبدأ معلقاً
    };
    DB.users.push(newUser);

    alert('✅ Compte créé ! En attente d\'approbation par l\'administrateur.');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #e0eaff 0%, #f0f4ff 100%)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', fontWeight: 'bold', color: '#1a1a2e' }}>
            <div style={{ background: '#6C63FF', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px' }}>🎓</div> EduLearnpro
          </div>
          <div style={{ marginTop: '-50px' }}>
            <h1 style={{ fontSize: '42px', color: '#1a1a2e', lineHeight: '1.2', marginBottom: '15px' }}>Rejoignez la communauté <br /> d'apprenants la plus <br /> <span style={{ color: '#6C63FF' }}>dynamique.</span></h1>
            <p style={{ fontSize: '17px', color: '#6b7280', maxWidth: '400px', lineHeight: '1.6' }}>Accédez à des cours, quiz, TP interactifs.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '15px', fontWeight: 'bold', color: '#1a1a2e' }}>
          <span>1280+ étudiants</span> <span>47 cours</span> <span>87% réussite</span>
        </div>
      </div>

      <div style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 50px' }}>
        <div style={{ marginBottom: '20px', color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => navigate('/')}>← Retour</div>
        <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: '40px' }}>
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '12px', padding: '4px', marginBottom: '25px' }}>
            <button onClick={() => navigate('/login')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#6b7280', fontWeight: '500', cursor: 'pointer' }}>Se connecter</button>
            <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', fontWeight: '500', color: '#1a1a2e', cursor: 'pointer' }}>Créer un compte</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', fontSize: '14px', color: '#1a1a2e' }}>Je suis</label>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button type="button" onClick={() => handleRoleSelect('etudiant')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: formData.role === 'etudiant' ? '2px solid #6C63FF' : '1px solid #e5e7eb', background: formData.role === 'etudiant' ? '#f8f7ff' : '#fff', color: formData.role === 'etudiant' ? '#6C63FF' : '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>🎓 Étudiant</button>
                <button type="button" onClick={() => handleRoleSelect('professeur')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: formData.role === 'professeur' ? '2px solid #6C63FF' : '1px solid #e5e7eb', background: formData.role === 'professeur' ? '#f8f7ff' : '#fff', color: formData.role === 'professeur' ? '#6C63FF' : '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>📖 Professeur</button>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px', color: '#374151' }}>Nom complet</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px', color: '#374151' }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px', color: '#374151' }}>Mot de passe</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', outline: 'none' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '14px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Créer mon compte</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;