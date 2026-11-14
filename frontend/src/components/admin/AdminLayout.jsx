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

const LINK_BASE = 'block rounded-lg px-3 py-2.5 no-underline';
const LINK_ACTIVE = `${LINK_BASE} bg-primary font-semibold text-white`;
const LINK_INACTIVE = `${LINK_BASE} text-[#d5dcec] hover:bg-white/10 hover:text-white`;

function AdminLayout() {
  // On small screens the sidebar is hidden until the Menu button is pressed.
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleExitDemo() {
    endDemo();
    navigate('/');
  }

  return (
    <div>
      <DevDemoBanner onExit={handleExitDemo} />

      <header className="flex items-center justify-between bg-sidebar px-4 py-3 text-white">
        <span className="font-bold">EarlyTrace Admin</span>
        <button
          type="button"
          className="btn btn-small md:hidden"
          aria-expanded={menuOpen}
          aria-controls="admin-sidebar"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close menu' : 'Menu'}
        </button>
      </header>

      <div className="flex min-h-[calc(100vh-100px)] flex-col md:flex-row">
        {/* Mobile: shown only when menuOpen is true. Desktop (md and up): always shown. */}
        <nav
          id="admin-sidebar"
          className={`${menuOpen ? 'block' : 'hidden'} w-full bg-sidebar p-2 md:block md:w-60 md:shrink-0`}
          aria-label="Admin navigation"
        >
          <ul>
            {ADMIN_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/admin'}
                  className={({ isActive }) => (isActive ? LINK_ACTIVE : LINK_INACTIVE)}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* The page that matches the current URL is rendered here. */}
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
