import React from 'react';

export default function NoMatch() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1 style={{ color: 'red' }}>404 - Page not found!</h1>
    </div>
  );
}
