function Stats() {
  const stats = [
    { number: '1 280+', label: 'Étudiants actifs', icon: '👨‍🎓' },
    { number: '47', label: 'Cours disponibles', icon: '📖' },
    { number: '312', label: 'Quiz interactifs', icon: '🧠' },
    { number: '87%', label: 'Taux de réussite', icon: '📈' }
  ];

  return (
    <section style={styles.stats}>
      <div style={styles.container}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.icon}>{stat.icon}</div>
            <h2 style={styles.number}>{stat.number}</h2>
            <p style={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  stats: {
    background: '#fff',
    padding: '70px 0'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    padding: '0 40px'
  },
  card: {
    textAlign: 'center',
    padding: '20px'
  },
  icon: {
    fontSize: '40px',
    marginBottom: '10px'
  },
  number: {
    fontSize: '40px',
    color: '#6C63FF',
    fontWeight: 'bold',
    margin: 0
  },
  label: {
    fontSize: '16px',
    color: '#666',
    marginTop: '5px'
  }
};

export default Stats;