import React from 'react';
import {
  FacebookLoginButton,
  GoogleLoginButton
} from 'react-social-login-buttons';

import { useStitchAuth } from '../StitchAuth/StitchAuth';

Login.propTypes = {};
export default function Login() {
  const { actions } = useStitchAuth();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <FacebookLoginButton
        style={{ display: 'flex', justifyContent: 'center', width: '250px' }}
        provider="facebook"
        onClick={() => actions.handleLogin('facebook')}
      >
        Log in with Facebook
      </FacebookLoginButton>
      <GoogleLoginButton
        style={{ display: 'flex', justifyContent: 'center', width: '250px' }}
        provider="google"
        onClick={(e) => {
          actions.handleLogin('google');
        }}
      >
        Log In with Google
      </GoogleLoginButton>
    </div>
  );
}
