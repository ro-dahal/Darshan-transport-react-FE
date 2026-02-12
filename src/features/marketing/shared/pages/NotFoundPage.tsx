import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <Seo title="Page Not Found" description="The page you are looking for does not exist." />
      <h1 style={{ fontSize: '4rem', color: '#fcaf17', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to="/" className="cta-button cta-primary" style={{ textDecoration: 'none' }}>
        Back to Home
      </Link>
    </div>
  );
};
