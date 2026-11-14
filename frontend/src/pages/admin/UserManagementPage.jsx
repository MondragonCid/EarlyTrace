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
  // Data from the backend. loading starts as true because we fetch right away.
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Increasing this number makes the useEffect below run again (used by "Try again").
  const [reloadCount, setReloadCount] = useState(0);

  // Filter inputs (controlled by UserFilters)
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // Which user's password is being reset (null = form is closed)
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Load the users when the page first appears, and again whenever
  // reloadCount changes. State is only set inside the .then/.catch/.finally
  // callbacks, after the backend has answered.
  useEffect(() => {
    let ignore = false; // becomes true if the page closes before the answer arrives

    getAllUsers()
      .then((data) => {
        if (!ignore) setUsers(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    // Cleanup: runs when the page closes or before the effect runs again.
    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  // "Try again" button: show the spinner again, then trigger the effect.
  function handleRetry() {
    setLoading(true);
    setError('');
    setReloadCount(reloadCount + 1);
  }

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
    content = <ErrorMessage message={error} onRetry={handleRetry} />;
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
      <div className="mb-4">
        <h1 className="mb-1 text-[1.6rem] font-bold">User Management</h1>
        <p className="my-4 text-muted">View all accounts, search and filter them, and reset passwords.</p>
      </div>

      {successMessage && (
        <p className="my-4 rounded-lg bg-success-bg px-4 py-3 text-success" role="status">
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
        <p className="mb-2 text-sm text-muted" aria-live="polite">
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
