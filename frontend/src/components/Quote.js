import React from 'react';

const Quote = () => {
  return (
    <section style={styles.section}>
      <p style={styles.quote}>
        “Turn your magical moments into beautiful memories by collaborating with us.”
      </p>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#ffeef2',
    padding: '2rem',
    textAlign: 'center',
  },
  quote: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: '2rem',
    color: '#d63384',
  },
};

export default Quote;
