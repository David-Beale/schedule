import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  useMemo
} from 'react';

import {
  hasLoggedInUser,
  loginAnonymous,
  loginGoogle,
  logoutCurrentUser,
  getCurrentUser,
  addAuthenticationListener,
  removeAuthenticationListener,
  handleOAuthRedirects
} from './../stitch/authentication';

const StitchAuthContext = createContext();

export function useStitchAuth() {
  const context = useContext(StitchAuthContext);
  if (!context) {
    throw new Error(`useStitchAuth must be used within a StitchAuthProvider`);
  }
  return context;
}

export function StitchAuthProvider(props) {
  const [authState, setAuthState] = useState({
    isLoggedIn: hasLoggedInUser(),
    currentUser: getCurrentUser()
  });

  useEffect(() => {
    const authListener = {
      onUserLoggedIn: (auth, loggedInUser) => {
        if (loggedInUser) {
          setAuthState((authState) => ({
            ...authState,
            isLoggedIn: true,
            currentUser: loggedInUser
          }));
        }
      },
      // eslint-disable-next-line no-unused-vars
      onUserLoggedOut: (auth, loggedOutUser) => {
        setAuthState((authState) => ({
          ...authState,
          isLoggedIn: false,
          currentUser: null
        }));
      }
    };
    addAuthenticationListener(authListener);
    handleOAuthRedirects();
    setAuthState((state) => ({ ...state }));
    return () => {
      removeAuthenticationListener(authListener);
    };
  }, []);

  // Authentication Actions
  const handleLogin = async (provider) => {
    if (!authState.isLoggedIn) {
      switch (provider) {
        case 'anonymous':
          return loginAnonymous();
        case 'google':
          console.log('hoohle!');
          return loginGoogle();
        // eslint-disable-next-line no-empty
        default: {
        }
      }
    }
  };
  const handleLogout = async () => {
    const { isLoggedIn } = authState;
    if (isLoggedIn) {
      await logoutCurrentUser();
      setAuthState({
        ...authState,
        isLoggedIn: false,
        currentUser: null
      });
    } else {
      console.log(`can't handleLogout when no user is logged in`);
    }
  };

  // We useMemo to improve performance by eliminating some re-renders
  const authInfo = useMemo(() => {
    const { isLoggedIn, currentUser } = authState;
    const value = {
      isLoggedIn,
      currentUser,
      actions: { handleLogin, handleLogout }
    };
    return value;
  }, [authState.isLoggedIn]);
  return (
    <StitchAuthContext.Provider value={authInfo}>
      {props.children}
    </StitchAuthContext.Provider>
  );
}
