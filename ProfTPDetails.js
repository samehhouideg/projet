// src/pages/ProfTPDetails.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB } from '../data';
import ProfSidebar from '../components/ProfSidebar';

function ProfTPDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const tpId = parseInt(id);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <ProfSidebar activeTab="tp" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <button onClick={() => navigate('/dashboard/professeur/tp')} style={{ background: 'transparent', border: 'none', color: '#6C63FF', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Retour</button>
        
        <TPDetailsEngine tpId={tpId} navigate={navigate} />
      </div>
    </div>
  );
}

class TPDetailsEngine extends React.Component {
  constructor(props) {
    super(props);
    
    const foundTP = DB.tps?.find(t => t.id === props.tpId);
    
    this.state = {
      tp: foundTP || null,
      isEditing: false,
      formData: {
        title: foundTP?.title || '',
        description: foundTP?.description || '',
        starterCode: foundTP?.starterCode || '',
        solution: foundTP?.solution || '',
        xp: foundTP?.xp || 100
      }
    };
  }

  handleSave = () => {
    const { tpId } = this.props;
    const { formData } = this.state;

    const updatedTps = DB.tps.map(t => 
      t.id === tpId ? { ...t, ...formData } : t
    );
    DB.tps = updatedTps;
    
    this.setState({
      tp: { ...this.state.tp, ...formData },
      isEditing: false
    });
    alert('✅ TP modifié avec succès !');
  };

  handleDelete = () => {
    const { tpId, navigate } = this.props;
    const { tp } = this.state;

    if (window.confirm(`Voulez-vous supprimer le TP "${tp?.title}" ?`)) {
      const updatedTps = DB.tps.filter(t => t.id !== tpId);
      DB.tps = updatedTps;
      alert('🗑️ TP supprimé.');
      navigate('/dashboard/professeur/tp');
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: { ...this.state.formData, [name]: value }
    });
  };

  render() {
    const { tp, isEditing, formData } = this.state;
    const { navigate } = this.props;

    if (!tp) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>❌ TP introuvable</h2>
          <button onClick={() => navigate('/dashboard/professeur/tp')} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
            Retour à la liste
          </button>
        </div>
      );
    }

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>{tp.title}</h1>
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
            <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: '#6C63FF' }}>Modifier le TP</h3>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Titre</label>
              <input type="text" name="title" value={formData.title} onChange={this.handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Description</label>
              <textarea name="description" value={formData.description} onChange={this.handleChange} rows="3" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Starter Code</label>
              <textarea name="starterCode" value={formData.starterCode} onChange={this.handleChange} rows="5" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontFamily: 'monospace', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>Solution</label>
              <textarea name="solution" value={formData.solution} onChange={this.handleChange} rows="5" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontFamily: 'monospace', fontSize: '14px' }} />
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
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>{tp.description}</p>
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', gap: '16px' }}>
              <div><span style={{ color: '#64748b' }}>XP</span><div style={{ fontWeight: '500' }}>{tp.xp} XP</div></div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Starter Code</h4>
              <div style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                {tp.starterCode}
              </div>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Solution</h4>
              <div style={{ background: '#1e293b', color: '#22c55e', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                {tp.solution}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ProfTPDetails;