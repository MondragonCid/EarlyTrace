import { Navigate } from 'react-router-dom';
import { isDemoAllowed, hasDemoAccess } from '../../utils/demoAccess.js';

// Guards the Admin pages. `children` is whatever is placed between
// <RequireDemoAdmin> and </RequireDemoAdmin> in App.jsx.
// Later, the real login check will replace the demo check.
function RequireDemoAdmin({ children }) {
  if (!isDemoAllowed()) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-[440px] rounded-lg border border-line bg-white p-6 text-center">
          <h1 className="mb-1 text-[1.6rem] font-bold">Login required</h1>
          <p className="my-4 text-muted">Admin pages need login, which is not built yet.</p>
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
