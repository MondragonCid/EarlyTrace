import { Routes, Route } from 'react-router-dom';
import DevDemoAccess from './components/common/DevDemoAccess.jsx';
import RequireDemoAdmin from './components/admin/RequireDemoAdmin.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import InstructorApprovalsPage from './pages/admin/InstructorApprovalsPage.jsx';
import UserManagementPage from './pages/admin/UserManagementPage.jsx';
import AuditLogsPage from './pages/admin/AuditLogsPage.jsx';
import IngestionLogsPage from './pages/admin/IngestionLogsPage.jsx';

function App() {
  return (
    <Routes>
      {/* Temporary start page with dev-only demo access (login is not built yet). */}
      <Route path="/" element={<DevDemoAccess />} />

      {/* Admin pages (Prince). AdminLayout shows the sidebar; the matching page
          is shown inside it through <Outlet />. */}
      <Route
        path="/admin"
        element={
          <RequireDemoAdmin>
            <AdminLayout />
          </RequireDemoAdmin>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="approvals" element={<InstructorApprovalsPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="audit-logs" element={<AuditLogsPage />} />
        <Route path="ingestion-logs" element={<IngestionLogsPage />} />
      </Route>

      {/* Student pages (Prince) will be added here in later sessions:
          /student, /student/courses/:id, /student/consultations, /student/notifications */}

      {/* ===== GROUPMATE'S ROUTES GO HERE =====
          /login, /register, /forgot-password, /account,
          everything under /instructor,
          /unauthorized,
          and the Not Found route: <Route path="*" ... />
          ====================================== */}
    </Routes>
  );
}

export default App;
