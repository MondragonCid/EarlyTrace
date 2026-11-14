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
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[440px] rounded-lg border border-line bg-white p-6 text-center">
        <h1 className="mb-1 text-[1.6rem] font-bold">EarlyTrace</h1>
        <p className="my-4">Early-warning platform for instructors.</p>

        {isDemoAllowed() ? (
          <>
            <p className="mt-4 inline-block rounded-full bg-warn-bg px-2.5 py-0.5 text-sm font-semibold text-[#7a5200]">
              Demo access (development only)
            </p>
            <p className="my-4 text-muted">
              Login is not built yet. This button only appears while running <code>npm run dev</code>.
            </p>
            <button type="button" className="btn btn-primary" onClick={handleEnterAdmin}>
              Open Admin pages (demo)
            </button>
          </>
        ) : (
          <p className="my-4 text-muted">Login is coming soon.</p>
        )}
      </div>
    </main>
  );
}

export default DevDemoAccess;
