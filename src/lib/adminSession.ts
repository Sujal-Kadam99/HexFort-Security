export const ADMIN_SESSION_KEY = "hexfort-admin-authenticated-at";
export const ADMIN_SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000;

// shortcut: browser-clock expiry gives an 8-hour re-login window; enforce server-side with Supabase Auth session timeboxing when the project plan supports it.
export function isAdminSessionValid() {
  const authenticatedAt = Number(window.localStorage.getItem(ADMIN_SESSION_KEY));
  return authenticatedAt > 0 && Date.now() - authenticatedAt < ADMIN_SESSION_MAX_AGE_MS;
}
