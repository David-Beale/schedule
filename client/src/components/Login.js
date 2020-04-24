import React from 'react';

import { useStitchAuth } from './StitchAuth';

Login.propTypes = {};
export default function Login() {
  const { actions } = useStitchAuth();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        provider="anonymous"
        onClick={() => actions.handleLogin('anonymous')}
      >
        Log In as a Guest User
      </div>
      <div
        provider="google"
        onClick={(e) => {
          actions.handleLogin('google');
        }}
      >
        Log In with Google
      </div>
    </div>
  );
}
