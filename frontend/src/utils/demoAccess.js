// Development-only demo access. Login is not built yet, so this lets us
// open the Admin pages during "npm run dev". It is never allowed in a
// production build because import.meta.env.DEV is false there.

const DEMO_KEY = 'earlytrace-demo-admin';

export function isDemoAllowed() {
  return import.meta.env.DEV;
}

export function hasDemoAccess() {
  if (!isDemoAllowed()) return false;
  try {
    return sessionStorage.getItem(DEMO_KEY) === 'yes';
  } catch {
    return false;
  }
}

export function startDemo() {
  try {
    sessionStorage.setItem(DEMO_KEY, 'yes');
  } catch {
    // Storage blocked: nothing we can do, the user will stay on the start page.
  }
}

export function endDemo() {
  try {
    sessionStorage.removeItem(DEMO_KEY);
  } catch {
    // ignore
  }
}
