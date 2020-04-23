import {
  AnonymousCredential,
  GoogleRedirectCredential
} from 'mongodb-stitch-browser-sdk';
import { app } from './app.js';

export function addAuthenticationListener(listener) {
  app.auth.addAuthListener(listener);
}

export function removeAuthenticationListener(listener) {
  app.auth.removeAuthListener(listener);
}

export async function loginGoogle() {
  console.log('hi');
  return await app.auth.loginWithRedirect(new GoogleRedirectCredential());
}

export async function handleOAuthRedirects() {
  if (app.auth.hasRedirectResult()) {
    console.log('hi2');
    return app.auth.handleRedirectResult();
  }
}

export function loginAnonymous() {
  // Allow users to log in anonymously
  return app.auth.loginWithCredential(new AnonymousCredential());
}

export function hasLoggedInUser() {
  // Check if there is currently a logged in user
  return app.auth.isLoggedIn;
}

export function getCurrentUser() {
  // Return the user object of the currently logged in user
  return app.auth.isLoggedIn ? app.auth.user : null;
}

export function logoutCurrentUser() {
  // Logout the currently logged in user
  const user = getCurrentUser();
  return app.auth.logoutUserWithId(user.id);
}
