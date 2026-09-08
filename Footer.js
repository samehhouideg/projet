import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>Prêt à transformer votre apprentissage ?</h2>
          <p style={styles.ctaDesc}>Rejoignez des milliers d'étudiants et professeurs qui utilisent EduLearnpro.</p>
          <Link to="/register">
            <button style={styles.ctaBtn}>Créer mon compte →</button>
          </Link>
        </div>
        <div style={styles.copyright}><p>© 2026 EduLearnpro — Plateforme e-learning moderne.</p></div>
      </div>
    </footer>
  );
}

const styles = {
  footer: { background: '#fff', padding: '80px 0 30px' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' },
  ctaCard: { background: '#7C6DF0', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', color: '#fff', marginBottom: '40px' },
  ctaTitle: { fontSize: '36px', fontWeight: '700', marginBottom: '16px' },
  ctaDesc: { fontSize: '16px', opacity: '0.9', maxWidth: '500px', margin: '0 auto 30px', lineHeight: '1.6' },
  ctaBtn: { background: '#fff', color: '#1A1A2E', border: 'none', padding: '14px 32px', borderRadius: '50px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  copyright: { textAlign: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '30px', color: '#888' }
};

export default Footer;