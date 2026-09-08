// src/pages/ProfReunionsDetails.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

function ProfReunionsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const reunionId = parseInt(id);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="reunions" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <button onClick={() => navigate('/dashboard/professeur/reunions')} style={{ background: 'transparent', border: 'none', color: '#6C63FF', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Retour</button>
        
        <ReunionDetailsEngine reunionId={reunionId} navigate={navigate} />
      </div>
    </div>
  );
}

class ReunionDetailsEngine extends React.Component {
  constructor(props) {
    super(props);
    
    const foundReunion = DB.reunions?.find(r => r.id === props.reunionId);
    
    this.state = {
      reunion: foundReunion || null,
      isEditing: false,
      formData: {
        title: foundReunion?.title || '',
        description: foundReunion?.description || '',
        date: foundReunion?.date || '',
        time: foundReunion?.time || '',
        duration: foundReunion?.duration || '1h',
        link: foundReunion?.link || '',
        status: foundReunion?.status || 'upcoming'
      }
    };
  }

  handleSave = () => {
    const { reunionId } = this.props;
    const { formData } = this.state;

    const updatedReunions = DB.reunions.map(r => 
      r.id === reunionId ? { ...r, ...formData } : r
    );
    DB.reunions = updatedReunions;
    
    this.setState({
      reunion: { ...this.state.reunion, ...formData },
      isEditing: false
    });
    alert('✅ Réunion modifiée avec succès !');
  };

  handleDelete = () => {
    const { reunionId, navigate } = this.props;
    const { reunion } = this.state;

    if (window.confirm(`Voulez-vous supprimer la réunion "${reunion?.title}" ?`)) {
      const updatedReunions = DB.reunions.filter(r => r.id !== reunionId);
      DB.reunions = updatedReunions;
      alert('🗑️ Réunion supprimée.');
      navigate('/dashboard/professeur/reunions');
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: { ...this.state.formData, [name]: value }
    });
  };

  render() {
    const { reunion, isEditing, formData } = this.state;
    const { navigate } = this.props;

    if (!reunion) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>❌ Réunion introuvable</h2>
          <button onClick={() => navigate('/dashboard/professeur/reunions')} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
            Retour à la liste
          </button>
        </div>
      );
    }

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>{reunion.title}</h1>
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
            <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: '#6C63FF' }}>Modifier la réunion</h3>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Titre</label>
              <input type="text" name="title" value={formData.title} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Description</label>
              <textarea name="description" value={formData.description} onChange={this.handleChange} rows="3" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Date</label>
              <input type="date" name="date" value={formData.date} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Heure</label>
              <input type="time" name="time" value={formData.time} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Lien</label>
              <input type="text" name="link" value={formData.link} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Statut</label>
              <select name="status" value={formData.status} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                <option value="upcoming">🔜 À venir</option>
                <option value="live">🟢 En direct</option>
                <option value="finished">✅ Terminée</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={this.handleSave} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>Enregistrer</button>
              <button onClick={() => this.setState({ isEditing: false })} style={{ background: 'transparent', border: '1px solid #d1d5db', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Annuler</button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>{reunion.description}</p>
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', gap: '16px' }}>
              <div><span style={{ color: '#64748b' }}>Date</span><div style={{ fontWeight: '500' }}>{reunion.date}</div></div>
              <div><span style={{ color: '#64748b' }}>Heure</span><div style={{ fontWeight: '500' }}>{reunion.time}</div></div>
              <div><span style={{ color: '#64748b' }}>Statut</span><div style={{ fontWeight: '500' }}>{reunion.status}</div></div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ProfReunionsDetails;