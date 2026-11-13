import { useNavigate } from 'react-router-dom';
import { isDemoAllowed, startDemo } from '../../utils/demoAccess.js';

// Temporary start page at "/". Until login is built, this offers a
// development-only button to open the Admin pages.
function DevDemoAccess() {
  const navigate = useNavigate();

  function handleEnterAdmin() {
    startDemo();
    navigate('/admin');
  }

  return (
    <main className="center-page">
      <div className="card start-card">
        <h1>EarlyTrace</h1>
        <p>Early-warning platform for instructors.</p>

        {isDemoAllowed() ? (
          <>
            <p className="demo-label">Demo access (development only)</p>
            <p className="muted">
              Login is not built yet. This button only appears while running <code>npm run dev</code>.
            </p>
            <button type="button" className="btn btn-primary" onClick={handleEnterAdmin}>
              Open Admin pages (demo)
            </button>
          </>
        ) : (
          <p className="muted">Login is coming soon.</p>
        )}
      </div>
    </main>
  );
}

export default DevDemoAccess;
