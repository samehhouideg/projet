// src/pages/EtudiantQuiz.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

const currentUserId = 2; // Sameh

function EtudiantQuiz() {
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // الدخول إلى الاختبار
  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setScore(0);
  };

  // اختيار إجابة
  const selectAnswer = (questionId, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  // الانتقال للسؤال التالي
  const nextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // انتهى الاختبار: حساب النتيجة
      calculateResult();
    }
  };

  // حساب النتيجة وإضافة النقاط
  const calculateResult = () => {
    let correct = 0;
    selectedQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / selectedQuiz.questions.length) * 100);
    setScore(finalScore);
    setShowResult(true);

    // إضافة النقاط إذا نجح الطالب (>= 60%)
    if (finalScore >= 60) {
      const user = DB.users.find(u => u.id === currentUserId);
      if (user) {
        user.xp += selectedQuiz.xp;
        DB.achievements.push({
          userId: currentUserId,
          type: 'quiz_passed',
          quizId: selectedQuiz.id,
          xp: selectedQuiz.xp
        });
        alert(`🎉 Bravo ! Vous avez réussi le quiz ! (+${selectedQuiz.xp} XP)`);
      }
    }
  };

  // العودة لقائمة الاختبارات
  const goBack = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setScore(0);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="quiz" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Quiz</h1>

        {!selectedQuiz ? (
          // عرض قائمة الاختبارات
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {DB.quizzes.map((quiz) => (
              <div key={quiz.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{quiz.title}</h3>
                <p style={{ color: '#64748b' }}>{quiz.description}</p>
                <p style={{ fontSize: '13px', color: '#6C63FF', fontWeight: '500' }}>+{quiz.xp} XP</p>
                <button onClick={() => startQuiz(quiz)} style={{ width: '100%', padding: '10px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
                  Démarrer le quiz
                </button>
              </div>
            ))}
          </div>
        ) : showResult ? (
          // عرض النتيجة النهائية
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '40px', textAlign: 'center', maxWidth: '500px', margin: '40px auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{score >= 60 ? '🎉 Félicitations !' : '😅 Essayez encore !'}</h2>
            <p style={{ fontSize: '18px', margin: '16px 0' }}>Votre score : <strong>{score}%</strong></p>
            <button onClick={goBack} style={{ padding: '12px 24px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Retour aux quiz
            </button>
          </div>
        ) : (
          // عرض أسئلة الاختبار
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedQuiz.title}</h3>
              <span style={{ color: '#64748b' }}>Question {currentQuestionIndex + 1} / {selectedQuiz.questions.length}</span>
            </div>
            <h4 style={{ fontSize: '16px', marginBottom: '16px' }}>{selectedQuiz.questions[currentQuestionIndex].question}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => selectAnswer(selectedQuiz.questions[currentQuestionIndex].id, index)}
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    border: selectedAnswers[selectedQuiz.questions[currentQuestionIndex].id] === index ? '2px solid #6C63FF' : '1px solid #e2e8f0',
                    background: selectedAnswers[selectedQuiz.questions[currentQuestionIndex].id] === index ? '#f8f7ff' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
            <button 
              onClick={nextQuestion}
              disabled={selectedAnswers[selectedQuiz.questions[currentQuestionIndex].id] === undefined}
              style={{ 
                width: '100%', 
                marginTop: '20px', 
                padding: '12px', 
                background: selectedAnswers[selectedQuiz.questions[currentQuestionIndex].id] !== undefined ? '#6C63FF' : '#e2e8f0',
                color: selectedAnswers[selectedQuiz.questions[currentQuestionIndex].id] !== undefined ? '#fff' : '#94a3b8',
                border: 'none', 
                borderRadius: '8px', 
                cursor: selectedAnswers[selectedQuiz.questions[currentQuestionIndex].id] !== undefined ? 'pointer' : 'not-allowed'
              }}
            >
              {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Voir les résultats' : 'Suivant →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EtudiantQuiz;