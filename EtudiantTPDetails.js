// src/pages/EtudiantTPDetails.js - النسخة النهائية (Class Component)
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

// المكون الرئيسي (واجهة التوجيه)
function EtudiantTPDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const tpId = parseInt(id);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="tp" />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <TPEngine tpId={tpId} navigate={navigate} />
      </div>
    </div>
  );
}

// ========================================
// هذا المكون الداخلي لا يحتوي على أي Hooks
// استخدمت Class Component لأن React لا يسمح بـ useState قبل if
// ========================================
class TPEngine extends React.Component {
  constructor(props) {
    super(props);
    
    // البحث عن التمرين
    const tp = DB.tps?.find(t => t.id === props.tpId);

    // تعريف الحالة
    this.state = {
      tp: tp || null,
      code: tp?.starterCode || '# Écrivez votre code Python ici...',
      output: '',
      isSubmitted: false
    };
  }

  // دالة تشغيل الكود
  handleRun = () => {
    this.setState({ output: '⏳ Exécution en cours...' });
    setTimeout(() => {
      const code = this.state.code;
      let result = '';

      try {
        if (code.includes('print')) {
          result = ">>> Résultat de l'exécution :\n";
          if (code.includes('print(somme_liste') && code.includes('15')) {
            result += "15\n✅ Le test a réussi !";
          } else if (code.includes('range')) {
            result += "5 x 1 = 5\n5 x 2 = 10\n...\n✅ Le test a réussi !";
          } else {
            result += "(Simulation) Le code semble correct.";
          }
        } else {
          result = "❌ Erreur : Aucune instruction print trouvée.";
        }
      } catch (e) {
        result = `❌ Erreur : ${e.message}`;
      }
      this.setState({ output: result });
    }, 1000);
  };

  // دالة إرسال التمرين
  handleSubmit = () => {
    if (!DB.tpHistory) DB.tpHistory = [];
    DB.tpHistory.push({
      tpId: this.state.tp.id,
      tpTitle: this.state.tp.title,
      status: 'Soumis',
      date: new Date().toISOString()
    });
    this.setState({ isSubmitted: true, output: '✅ TP soumis avec succès ! En attente de correction.' });
  };

  handleCodeChange = (e) => {
    this.setState({ code: e.target.value });
  };

  render() {
    const { tp, code, output, isSubmitted } = this.state;
    const { navigate } = this.props;

    // التحقق من وجود التمرين بعد تعريف الحالة
    if (!tp) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>❌ TP introuvable</h2>
          <button 
            onClick={() => navigate('/dashboard/etudiant/tp')}
            style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
          >
            Retour aux TP
          </button>
        </div>
      );
    }

    return (
      <div>
        <button onClick={() => navigate('/dashboard/etudiant/tp')} style={{ background: 'transparent', border: 'none', color: '#6C63FF', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Retour aux TP</button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', minHeight: '600px' }}>
          
          {/* الجزء الأيسر: نص التمرين */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>{tp.title}</h2>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px', flex: 1 }}>{tp.description}</p>
            <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>💡 Indice</h4>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Utilisez une boucle `for` ou une fonction `sum()` pour résoudre cet exercice.</p>
            </div>
          </div>

          {/* الجزء الأيمن: محرر الكود */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>✏️ Éditeur de code</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={this.handleRun} disabled={isSubmitted} style={{ padding: '8px 16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', opacity: isSubmitted ? 0.5 : 1 }}>
                  ▶ Run
                </button>
                <button onClick={this.handleSubmit} disabled={isSubmitted} style={{ padding: '8px 16px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', opacity: isSubmitted ? 0.5 : 1 }}>
                  📤 Soumettre
                </button>
              </div>
            </div>

            <textarea 
              value={code}
              onChange={this.handleCodeChange}
              disabled={isSubmitted}
              style={{ 
                flex: 1, 
                width: '100%', 
                padding: '16px', 
                fontFamily: '"Courier New", monospace', 
                fontSize: '14px', 
                background: '#1e293b', 
                color: '#e2e8f0', 
                border: 'none', 
                borderRadius: '8px', 
                resize: 'none', 
                minHeight: '300px',
                opacity: isSubmitted ? 0.6 : 1
              }}
              placeholder="# Écrivez votre code Python ici..."
            />

            <div style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', whiteSpace: 'pre-wrap', fontFamily: '"Courier New", monospace', fontSize: '14px', color: output.includes('✅') ? '#22c55e' : output.includes('❌') ? '#ef4444' : '#0f172a' }}>
              {output || '💡 Le résultat de votre code apparaîtra ici après avoir cliqué sur "Run".'}
            </div>

            {isSubmitted && (
              <div style={{ marginTop: '12px', padding: '12px 16px', background: '#dcfce7', color: '#16a34a', borderRadius: '8px', fontWeight: '500' }}>
                ✅ TP soumis avec succès ! Vous recevrez une correction prochainement.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EtudiantTPDetails;