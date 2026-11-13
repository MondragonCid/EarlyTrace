import { isDemoAllowed } from '../../utils/demoAccess.js';

// A strip at the top of the page that reminds everyone this is demo access.
// It renders nothing outside development mode.
function DevDemoBanner({ onExit }) {
  if (!isDemoAllowed()) return null;

  return (
    <div className="demo-banner" role="note">
      <span>
        <strong>Demo access (development only).</strong> You are not logged in. Login is not built yet.
      </span>
      {onExit && (
        <button type="button" className="btn btn-small" onClick={onExit}>
          Exit demo
        </button>
      )}
    </div>
  );
}

export default DevDemoBanner;
