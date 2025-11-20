import React from 'react';
import Nav from './Nav.jsx';

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <main style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
        {children}
      </main>
    </div>
  );
}