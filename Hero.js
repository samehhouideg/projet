import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <div style={styles.badge}>✦ Nouvelle génération de plateforme éducative</div>
        <h1 style={styles.title}>Apprenez, enseignez,<br /><span style={styles.highlight}>progressez</span></h1>
        <p style={styles.desc}>Une plateforme complète pour étudiants, professeurs et administrateurs.</p>
        <div style={styles.btnGroup}>
          <Link to="/register"><button style={styles.btnPrimary}>Commencer gratuitement →</button></Link>
          <Link to="/login"><button style={styles.btnSecondary}>Se connecter</button></Link>
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: { minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #EEF2FF 0%, #E0F2FE 50%, #F3E8FF 100%)' },
  container: { maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '0 24px' },
  badge: { display: 'inline-block', background: '#ffffffcc', padding: '10px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '500', marginBottom: '30px' },
  title: { fontSize: '64px', fontWeight: '800', color: '#1A1A2E', lineHeight: '1.1', marginBottom: '24px' },
  highlight: { color: '#7C6DF0' },
  desc: { fontSize: '18px', color: '#666', lineHeight: '1.7', maxWidth: '650px', margin: '0 auto 40px' },
  btnGroup: { display: 'flex', justifyContent: 'center', gap: '16px' },
  btnPrimary: { background: '#7C6DF0', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '50px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  btnSecondary: { background: '#fff', color: '#333', border: '1px solid #eaeaea', padding: '14px 32px', borderRadius: '50px', fontSize: '16px', fontWeight: '500', cursor: 'pointer' }
};

export default Hero;