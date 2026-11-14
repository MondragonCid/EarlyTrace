import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../api/userApi.js';
import Loading from '../../components/common/Loading.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import NotAvailable from '../../components/common/NotAvailable.jsx';
import StatCard from '../../components/admin/StatCard.jsx';
import RecentUsersList from '../../components/admin/RecentUsersList.jsx';

const RECENT_COUNT = 5;
const SECTION_TITLE = 'mt-8 mb-3 text-[1.2rem] font-bold';

// How many users have the given role.
function countByRole(users, role) {
  return users.filter((user) => user.roleType === role).length;
}

function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  // Load all users when the page opens (and again when "Try again" is pressed).
  useEffect(() => {
    let ignore = false;

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

    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  function handleRetry() {
    setLoading(true);
    setError('');
    setReloadCount(reloadCount + 1);
  }

  // Newest users first. [...users] makes a copy so the state array is not changed.
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, RECENT_COUNT);

  const stats = [
    { label: 'Total users', value: users.length },
    { label: 'Admins', value: countByRole(users, 'ADMIN') },
    { label: 'Instructors', value: countByRole(users, 'INSTRUCTOR') },
    { label: 'Students', value: countByRole(users, 'STUDENT') },
  ];

  let userSection;
  if (loading) {
    userSection = <Loading message="Loading dashboard..." />;
  } else if (error) {
    userSection = <ErrorMessage message={error} onRetry={handleRetry} />;
  } else {
    userSection = (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="mt-8 mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[1.2rem] font-bold">Recently added users</h2>
          <Link to="/admin/users" className="font-semibold text-primary underline-offset-2 hover:underline">
            Manage users
          </Link>
        </div>
        {recentUsers.length === 0 ? (
          <EmptyState title="No users yet" message="New accounts will appear here." />
        ) : (
          <RecentUsersList users={recentUsers} />
        )}
      </>
    );
  }

  return (
    <section>
      <div className="mb-4">
        <h1 className="mb-1 text-[1.6rem] font-bold">Admin Dashboard</h1>
        <p className="my-4 text-muted">An overview of accounts and system activity.</p>
      </div>

      <h2 className={SECTION_TITLE}>Users</h2>
      {userSection}

      <h2 className={SECTION_TITLE}>Approvals, account status and CSV uploads</h2>
      <div className="grid gap-x-4 lg:grid-cols-3">
        <NotAvailable
          feature="Pending instructor approvals"
          missing="The backend User record has no approval status (pending, approved, rejected) yet."
        />
        <NotAvailable
          feature="Active / inactive users"
          missing="The backend User record has no account status field (active or inactive) yet."
        />
        <NotAvailable
          feature="Recent CSV errors"
          missing="The backend has no CSV upload or ingestion log endpoint yet."
        />
      </div>
    </section>
  );
}

export default AdminDashboardPage;
