import { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/userApi.js';
import Loading from '../../components/common/Loading.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import NotAvailable from '../../components/common/NotAvailable.jsx';
import UserFilters from '../../components/admin/UserFilters.jsx';
import UserTable from '../../components/admin/UserTable.jsx';
import ResetPasswordForm from '../../components/admin/ResetPasswordForm.jsx';

function UserManagementPage() {
  // Data from the backend
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter inputs (controlled by UserFilters)
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // Which user's password is being reset (null = form is closed)
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  async function loadUsers() {
    setLoading(true);
    setError('');
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Load the users once, when the page first appears.
  useEffect(() => {
    loadUsers();
  }, []);

  // Work out which users to show, based on the search text and role.
  const searchText = search.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === 'ALL' || user.roleType === roleFilter;
    const matchesSearch =
      searchText === '' ||
      (user.fullName || '').toLowerCase().includes(searchText) ||
      (user.email || '').toLowerCase().includes(searchText);
    return matchesRole && matchesSearch;
  });

  function handleOpenReset(user) {
    setSuccessMessage('');
    setSelectedUser(user);
  }

  function handlePasswordSaved(updatedUser) {
    // Replace the old copy of this user in the list with the saved one.
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setSelectedUser(null);
    setSuccessMessage(`Password for ${updatedUser.fullName} was reset successfully.`);
  }

  function clearFilters() {
    setSearch('');
    setRoleFilter('ALL');
  }

  // Decide what goes in the main area: loading, error, empty, or the table.
  let content;
  if (loading) {
    content = <Loading message="Loading users..." />;
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={loadUsers} />;
  } else if (users.length === 0) {
    content = <EmptyState title="No users yet" message="Users will appear here once accounts are created." />;
  } else if (filteredUsers.length === 0) {
    content = (
      <div>
        <EmptyState title="No users match these filters" message="Try a different name, email, or role." />
        <button type="button" className="btn btn-secondary" onClick={clearFilters}>
          Clear filters
        </button>
      </div>
    );
  } else {
    content = <UserTable users={filteredUsers} onResetPassword={handleOpenReset} />;
  }

  return (
    <section>
      <div className="page-header">
        <h1>User Management</h1>
        <p className="muted">View all accounts, search and filter them, and reset passwords.</p>
      </div>

      {successMessage && (
        <p className="message message-success" role="status">
          {successMessage}
        </p>
      )}

      {selectedUser && (
        <ResetPasswordForm
          key={selectedUser.id}
          user={selectedUser}
          onSaved={handlePasswordSaved}
          onCancel={() => setSelectedUser(null)}
        />
      )}

      <UserFilters
        search={search}
        role={roleFilter}
        onSearchChange={setSearch}
        onRoleChange={setRoleFilter}
      />

      {!loading && !error && users.length > 0 && (
        <p className="result-count" aria-live="polite">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      )}

      {content}

      <NotAvailable
        feature="Activate / deactivate accounts"
        missing="The backend User record has no account status field (active or inactive) yet. This option will be added once the backend supports it."
      />
    </section>
  );
}

export default UserManagementPage;
