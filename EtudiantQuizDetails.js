// src/pages/EtudiantQuizDetails.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

function EtudiantQuizDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const quizId = parseInt(id);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="quiz" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <button onClick={() => navigate('/dashboard/etudiant/quiz')} style={{ background: 'transparent', border: 'none', color: '#6C63FF', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Retour aux quiz</button>
        
        <QuizEngine quizId={quizId} navigate={navigate} />
      </div>
    </div>
  );
}

// ==========================================
// محرك الاختبار (Class Component)
// ==========================================
class QuizEngine extends React.Component {
  constructor(props) {
    super(props);
    
    const foundQuiz = DB.quizzes?.find(q => q.id === props.quizId);
    
    this.state = {
      quiz: foundQuiz || null,
      currentIndex: 0,
      selectedAnswers: {},
      isFinished: false,
      result: null
    };
  }

  // دالة اختيار إجابة
  handleSelect = (questionId, optionIndex) => {
    this.setState({
      selectedAnswers: { ...this.state.selectedAnswers, [questionId]: optionIndex }
    });
  };

  // دالة الانتقال للسؤال التالي
  handleNext = () => {
    const { quiz, currentIndex, selectedAnswers } = this.state;

    if (currentIndex < quiz.questions.length - 1) {
      this.setState({ currentIndex: currentIndex + 1 });
    } else {
      // حساب النتيجة النهائية
      let correct = 0;
      quiz.questions.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswer) correct++;
      });
      const score = Math.round((correct / quiz.questions.length) * 100);
      
      // إضافة النقاط للطالب
      const userId = parseInt(localStorage.getItem('userId')) || 2;
      const user = DB.users.find(u => u.id === userId);
      if (user && score >= 60) {
        user.xp += quiz.xp;
        if (!DB.achievements) DB.achievements = [];
        DB.achievements.push({ userId, type: 'quiz_passed', quizId: quiz.id, xp: quiz.xp });
      }

      this.setState({
        isFinished: true,
        result: { correct, total: quiz.questions.length, score, passed: score >= 60 }
      });
    }
  };

  // دالة إعادة المحاولة
  handleRetry = () => {
    this.setState({
      currentIndex: 0,
      selectedAnswers: {},
      isFinished: false,
      result: null
    });
  };

  render() {
    const { quiz, currentIndex, selectedAnswers, isFinished, result } = this.state;
    const { navigate } = this.props;

    if (!quiz) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>❌ Quiz introuvable</h2>
          <button onClick={() => navigate('/dashboard/etudiant/quiz')} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
            Retour aux quiz
          </button>
        </div>
      );
    }

    if (isFinished) {
      return (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '40px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>
            {result?.passed ? '🎉' : '😅'}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
            {result?.passed ? 'Félicitations !' : 'Essayez encore !'}
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px' }}>
            {result?.passed 
              ? `Vous avez réussi le quiz avec un score de ${result.score}% ! (+${quiz.xp} XP)` 
              : `Vous avez obtenu ${result.score}%. La note de passage est de 60%.`}
          </p>
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
              <span>Bonnes réponses</span>
              <span>{result?.correct} / {result?.total}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span>Score final</span>
              <span style={{ fontWeight: 'bold', color: result?.passed ? '#22c55e' : '#ef4444' }}>{result?.score}%</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={this.handleRetry} style={{ padding: '10px 24px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', color: '#0f172a', cursor: 'pointer' }}>🔄 Réessayer</button>
            <button onClick={() => navigate('/dashboard/etudiant/quiz')} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#6C63FF', color: '#fff', cursor: 'pointer' }}>Retour aux quiz</button>
          </div>
        </div>
      );
    }

    const question = quiz.questions[currentIndex];
    const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

    return (
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{quiz.title}</h2>
          <span style={{ fontSize: '14px', color: '#64748b' }}>Question {currentIndex + 1} / {quiz.questions.length}</span>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(to right, #6C63FF, #a78bfa)', borderRadius: '4px', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        <div style={{ minHeight: '200px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>{question.question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[question.id] === index;
              return (
                <div 
                  key={index}
                  onClick={() => this.handleSelect(question.id, index)}
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    border: isSelected ? '2px solid #6C63FF' : '1px solid #e2e8f0',
                    background: isSelected ? '#f8f7ff' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontWeight: isSelected ? '600' : '400' }}>
                    {option}
                  </span>
                  {isSelected && <span style={{ float: 'right', color: '#6C63FF' }}>✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        <button 
          onClick={this.handleNext}
          disabled={selectedAnswers[question.id] === undefined}
          style={{ 
            width: '100%', 
            marginTop: '20px', 
            padding: '12px', 
            background: selectedAnswers[question.id] !== undefined ? '#6C63FF' : '#e2e8f0',
            color: selectedAnswers[question.id] !== undefined ? '#fff' : '#94a3b8',
            border: 'none', 
            borderRadius: '8px', 
            cursor: selectedAnswers[question.id] !== undefined ? 'pointer' : 'not-allowed',
            fontWeight: '600'
          }}
        >
          {currentIndex === quiz.questions.length - 1 ? '📊 Voir les résultats' : 'Suivant →'}
        </button>
      </div>
    );
  }
}

export default EtudiantQuizDetails;