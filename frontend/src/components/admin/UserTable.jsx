// Shows the list of users as a table.
// Props:
//   users           - the (already filtered) array of users to show
//   onResetPassword - function called with a user when "Reset password" is clicked

const ROLE_LABELS = {
  ADMIN: 'Admin',
  INSTRUCTOR: 'Instructor',
  STUDENT: 'Student',
};

// The backend sends the created date as "timestamp", e.g. "2026-11-13T09:30:00".
function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (isNaN(date)) return '—';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function UserTable({ users, onResetPassword }) {
  return (
    <div className="table-wrapper">
      <table>
        <caption className="visually-hidden">Users</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Created</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <span className="role-tag">{ROLE_LABELS[user.roleType] || user.roleType}</span>
              </td>
              <td>{formatDate(user.timestamp)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-small"
                  onClick={() => onResetPassword(user)}
                  aria-label={`Reset password for ${user.fullName}`}
                >
                  Reset password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
