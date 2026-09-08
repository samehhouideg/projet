// src/pages/ProfQuiz.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

function ProfQuiz() {
  const navigate = useNavigate();
  
  const [quizzes, setQuizzes] = useState(DB.quizzes || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const filteredQuizzes = quizzes.filter(quiz =>
  quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
);
  // نموذج إضافة اختبار جديد
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    courseId: 1,
    xp: 50,
    questions: []
  });

  // نموذج سؤال جديد
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', ''],
    correctAnswer: 0
  });

  // دالة إضافة سؤال
  const handleAddQuestion = () => {
    if (newQuestion.question.trim() === '') {
      alert('Veuillez écrire une question.');
      return;
    }
    if (newQuestion.options.some(opt => opt.trim() === '')) {
      alert('Veuillez remplir toutes les options.');
      return;
    }

    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, { ...newQuestion, id: Date.now() }]
    });
    setNewQuestion({
      question: '',
      options: ['', '', ''],
      correctAnswer: 0
    });
  };

  // دالة حذف سؤال
  const handleRemoveQuestion = (index) => {
    const updatedQuestions = newQuiz.questions.filter((_, i) => i !== index);
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  // دالة إضافة اختبار
  const handleAddQuiz = () => {
    if (newQuiz.title.trim() === '') {
      alert('Veuillez entrer un titre pour le quiz.');
      return;
    }
    if (newQuiz.questions.length === 0) {
      alert('Veuillez ajouter au moins une question.');
      return;
    }

    const newId = quizzes.length > 0 ? Math.max(...quizzes.map(q => q.id)) + 1 : 1;
    const quizToAdd = { ...newQuiz, id: newId };
    
    DB.quizzes.push(quizToAdd);
    setQuizzes([...quizzes, quizToAdd]);
    
    setShowAddModal(false);
    setNewQuiz({
      title: '',
      description: '',
      courseId: 1,
      xp: 50,
      questions: []
    });
    alert('✅ Quiz ajouté avec succès !');
  };

  // دالة حذف اختبار
  const handleDeleteQuiz = (quizId, quizTitle) => {
    if (window.confirm(`Voulez-vous supprimer le quiz "${quizTitle}" ?`)) {
      const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
      DB.quizzes = updatedQuizzes;
      setQuizzes(updatedQuizzes);
      alert('🗑️ Quiz supprimé avec succès.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="quiz" />
      
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Quiz</h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Gérez vos quiz et leurs questions. ({quizzes.length} quiz)</p>
          </div>
          <button onClick={() => setShowAddModal(true)} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
            + Nouveau quiz
          </button>
        </div>

        {/* شريط البحث */}
        <div style={{ marginBottom: '24px', background: '#fff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ color: '#94a3b8', marginRight: '12px' }}>🔍</span>
          <input type="text" placeholder="Rechercher un quiz..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '15px', background: 'transparent' }} />
        </div>

        {/* شبكة الاختبارات */}
        {filteredQuizzes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Aucun quiz trouvé</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>{quiz.title}</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>{quiz.description}</p>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#64748b' }}>
                      <span>📝 {quiz.questions.length} questions</span>
                      <span>⭐ +{quiz.xp} XP</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => navigate(`/dashboard/professeur/quiz/${quiz.id}`)} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✏️</button>
                    <button onClick={() => handleDeleteQuiz(quiz.id, quiz.title)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === نافذة إضافة Quiz (مع الأسئلة) === */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '600px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Créer un nouveau quiz</h2>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Titre du quiz</label>
              <input type="text" value={newQuiz.title} onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Description</label>
              <textarea value={newQuiz.description} onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })} rows="2" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>XP à gagner</label>
              <input type="number" value={newQuiz.xp} onChange={(e) => setNewQuiz({ ...newQuiz, xp: parseInt(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>

            <hr style={{ margin: '16px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />

            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Questions ({newQuiz.questions.length})</h3>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Question</label>
              <input type="text" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} placeholder="Écrivez votre question ici..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Option 1</label>
                <input type="text" value={newQuestion.options[0]} onChange={(e) => setNewQuestion({ ...newQuestion, options: [e.target.value, newQuestion.options[1], newQuestion.options[2]] })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Option 2</label>
                <input type="text" value={newQuestion.options[1]} onChange={(e) => setNewQuestion({ ...newQuestion, options: [newQuestion.options[0], e.target.value, newQuestion.options[2]] })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Option 3</label>
                <input type="text" value={newQuestion.options[2]} onChange={(e) => setNewQuestion({ ...newQuestion, options: [newQuestion.options[0], newQuestion.options[1], e.target.value] })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              </div>
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <label style={{ fontWeight: '500', fontSize: '14px' }}>Bonne réponse :</label>
              <select value={newQuestion.correctAnswer} onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: parseInt(e.target.value) })} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                <option value={0}>Option 1</option>
                <option value={1}>Option 2</option>
                <option value={2}>Option 3</option>
              </select>
              <button onClick={handleAddQuestion} style={{ padding: '8px 16px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
                + Ajouter une question
              </button>
            </div>

            {/* قائمة الأسئلة المضافة */}
            {newQuiz.questions.length > 0 && (
              <div style={{ marginBottom: '12px', maxHeight: '150px', overflowY: 'auto' }}>
                {newQuiz.questions.map((q, index) => (
                  <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '500' }}>{index + 1}. {q.question}</span>
                    <button onClick={() => handleRemoveQuestion(index)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'transparent', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleAddQuiz} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#6C63FF', color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Enregistrer le quiz</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfQuiz;