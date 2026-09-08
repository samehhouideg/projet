function Features() {
  const features = [
    { title: 'Cours interactifs', desc: 'Chapitres riches avec vidéos, audio, images et documents.', icon: '📖' },
    { title: 'TP de programmation', desc: 'Écrivez et exécutez du code Python directement dans la plateforme.', icon: '</>' },
    { title: 'Quiz auto-corrigés', desc: 'Évaluez vos connaissances instantanément.', icon: '🧠' },
    { title: 'Réunions en direct', desc: 'Sessions live intégrées avec Google Meet et Zoom.', icon: '🎥' },
    { title: 'Gamification', desc: 'Badges, niveaux XP, récompenses pour rester motivé.', icon: '🏆' },
    { title: 'Chat & Forum', desc: 'Communiquez avec vos professeurs et pairs.', icon: '💬' }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Tout ce dont vous avez besoin</h2>
          <p style={styles.subtitle}>Une suite complète d'outils pédagogiques modernes.</p>
        </div>
        <div style={styles.grid}>
          {features.map((item, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.iconBox}><span>{item.icon}</span></div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { background: '#fff', padding: '80px 0' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' },
  header: { textAlign: 'center', marginBottom: '60px' },
  title: { fontSize: '40px', fontWeight: '700', color: '#1A1A2E', marginBottom: '12px' },
  subtitle: { fontSize: '18px', color: '#777' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  card: { background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #f0f0f0' },
  iconBox: { width: '48px', height: '48px', background: '#7C6DF0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#fff', fontSize: '20px' },
  cardTitle: { fontSize: '18px', fontWeight: '600', color: '#1A1A2E', marginBottom: '8px' },
  cardDesc: { fontSize: '15px', color: '#666', lineHeight: '1.6' }
};

export default Features;