import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={styles.logoText}>EduLearnpro</span>
        </Link>

        <div style={styles.rightSide}>
          <button style={styles.themeToggle}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/>
            </svg></button>
          <Link to="/login" style={styles.loginLink}>Se connecter</Link>
          <Link to="/register">
            <button style={styles.signupBtn}>Créer un compte</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: { background: '#fff', padding: '16px 0', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 1000 },
  container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' },
  logoIcon: { width: '40px', height: '40px', background: '#7C6DF0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontSize: '22px', fontWeight: '700', color: '#1A1A2E' },
  rightSide: { display: 'flex', alignItems: 'center', gap: '20px' },
  themeToggle: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px' },
  loginLink: { textDecoration: 'none', color: '#333', fontSize: '15px', fontWeight: '500' },
  signupBtn: { background: '#7C6DF0', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

export default Navbar;