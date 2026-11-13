import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import DevDemoBanner from '../common/DevDemoBanner.jsx';
import { endDemo } from '../../utils/demoAccess.js';

// The 5 Admin links. The sidebar is built from this list with map().
const ADMIN_LINKS = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/approvals', label: 'Instructor Approvals' },
  { to: '/admin/users', label: 'User Management' },
  { to: '/admin/audit-logs', label: 'Audit Logs' },
  { to: '/admin/ingestion-logs', label: 'CSV Ingestion Logs' },
];

function AdminLayout() {
  // On small screens the sidebar is hidden until the Menu button is pressed.
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleExitDemo() {
    endDemo();
    navigate('/');
  }

  return (
    <div className="app-shell">
      <DevDemoBanner onExit={handleExitDemo} />

      <header className="topbar">
        <span className="brand">EarlyTrace Admin</span>
        <button
          type="button"
          className="btn btn-small menu-button"
          aria-expanded={menuOpen}
          aria-controls="admin-sidebar"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close menu' : 'Menu'}
        </button>
      </header>

      <div className="layout">
        <nav
          id="admin-sidebar"
          className={menuOpen ? 'sidebar open' : 'sidebar'}
          aria-label="Admin navigation"
        >
          <ul>
            {ADMIN_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/admin'}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* The page that matches the current URL is rendered here. */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
