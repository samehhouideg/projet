// src/pages/ProfQuizDetails.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

function ProfQuizDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const quizId = parseInt(id);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="quiz" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <button onClick={() => navigate('/dashboard/professeur/quiz')} style={{ background: 'transparent', border: 'none', color: '#6C63FF', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Retour</button>
        
        <QuizDetailsEngine quizId={quizId} navigate={navigate} />
      </div>
    </div>
  );
}

class QuizDetailsEngine extends React.Component {
  constructor(props) {
    super(props);
    
    const foundQuiz = DB.quizzes?.find(q => q.id === props.quizId);
    
    this.state = {
      quiz: foundQuiz || null,
      isEditing: false,
      formData: {
        title: foundQuiz?.title || '',
        description: foundQuiz?.description || '',
        xp: foundQuiz?.xp || 50
      }
    };
  }

  handleSave = () => {
    const { quizId } = this.props;
    const { formData } = this.state;

    const updatedQuizzes = DB.quizzes.map(q => 
      q.id === quizId ? { ...q, ...formData } : q
    );
    DB.quizzes = updatedQuizzes;
    
    this.setState({
      quiz: { ...this.state.quiz, ...formData },
      isEditing: false
    });
    alert('✅ Quiz modifié avec succès !');
  };

  handleDelete = () => {
    const { quizId, navigate } = this.props;
    const { quiz } = this.state;

    if (window.confirm(`Voulez-vous supprimer le quiz "${quiz?.title}" ?`)) {
      const updatedQuizzes = DB.quizzes.filter(q => q.id !== quizId);
      DB.quizzes = updatedQuizzes;
      alert('🗑️ Quiz supprimé.');
      navigate('/dashboard/professeur/quiz');
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: { ...this.state.formData, [name]: value }
    });
  };

  render() {
    const { quiz, isEditing, formData } = this.state;
    const { navigate } = this.props;

    if (!quiz) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>❌ Quiz introuvable</h2>
          <button onClick={() => navigate('/dashboard/professeur/quiz')} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
            Retour à la liste
          </button>
        </div>
      );
    }

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>{quiz.title}</h1>
          <div>
            {!isEditing && (
              <>
                <button onClick={() => this.setState({ isEditing: true })} style={{ background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px' }}>✏️ Modifier</button>
                <button onClick={this.handleDelete} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>🗑️ Supprimer</button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: '#6C63FF' }}>Modifier le quiz</h3>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Titre</label>
              <input type="text" name="title" value={formData.title} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Description</label>
              <textarea name="description" value={formData.description} onChange={this.handleChange} rows="3" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>XP</label>
              <input type="number" name="xp" value={formData.xp} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={this.handleSave} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>Enregistrer</button>
              <button onClick={() => this.setState({ isEditing: false })} style={{ background: 'transparent', border: '1px solid #d1d5db', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Annuler</button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>{quiz.description}</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div><span style={{ color: '#64748b' }}>Questions</span><div style={{ fontWeight: '500' }}>{quiz.questions.length}</div></div>
              <div><span style={{ color: '#64748b' }}>XP</span><div style={{ fontWeight: '500' }}>{quiz.xp} XP</div></div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ProfQuizDetails;