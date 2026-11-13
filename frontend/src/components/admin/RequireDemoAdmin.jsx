import { Navigate } from 'react-router-dom';
import { isDemoAllowed, hasDemoAccess } from '../../utils/demoAccess.js';

// Guards the Admin pages. `children` is whatever is placed between
// <RequireDemoAdmin> and </RequireDemoAdmin> in App.jsx.
// Later, the real login check will replace the demo check.
function RequireDemoAdmin({ children }) {
  if (!isDemoAllowed()) {
    return (
      <main className="center-page">
        <div className="card start-card">
          <h1>Login required</h1>
          <p className="muted">Admin pages need login, which is not built yet.</p>
        </div>
      </main>
    );
  }

  if (!hasDemoAccess()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireDemoAdmin;
