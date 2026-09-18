/**
 * Admin Session Management
 * Persists session state across the current browser tab using sessionStorage.
 */

const SESSION_KEY = 'alan_admin_active_session_v1';

export function getAdminSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session && session.authenticated) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

export function setAdminSession(userMeta = {}) {
  try {
    const session = {
      authenticated: true,
      user: 'Muhammad Umar',
      nickname: 'Alan Hanma',
      loginTime: new Date().toISOString(),
      ...userMeta,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch (err) {
    console.error('Failed to set admin session:', err);
    return false;
  }
}

export function clearAdminSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    return true;
  } catch (err) {
    console.error('Failed to clear admin session:', err);
    return false;
  }
}

export function isAdminAuthenticated() {
  return !!getAdminSession();
}
