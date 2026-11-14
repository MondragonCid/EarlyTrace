// Shows the list of users as a table.
// Props:
//   users           - the (already filtered) array of users to show
//   onResetPassword - function called with a user when "Reset password" is clicked

const ROLE_LABELS = {
  ADMIN: 'Admin',
  INSTRUCTOR: 'Instructor',
  STUDENT: 'Student',
};

const TH = 'whitespace-nowrap bg-subtle px-3 py-2.5 text-left text-[0.85rem] font-bold uppercase tracking-wide text-muted';
const TD = 'whitespace-nowrap px-3 py-2.5 text-left';

// The backend sends the created date as "timestamp", e.g. "2026-11-13T09:30:00".
function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (isNaN(date)) return '—';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function UserTable({ users, onResetPassword }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full border-collapse">
        <caption className="sr-only">Users</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className={TH}>Name</th>
            <th scope="col" className={TH}>Email</th>
            <th scope="col" className={TH}>Role</th>
            <th scope="col" className={TH}>Created</th>
            <th scope="col" className={TH}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-line last:border-b-0">
              <td className={TD}>{user.fullName}</td>
              <td className={TD}>{user.email}</td>
              <td className={TD}>
                <span className="inline-block rounded bg-subtle px-2 py-0.5 text-[0.85rem] font-semibold">
                  {ROLE_LABELS[user.roleType] || user.roleType}
                </span>
              </td>
              <td className={TD}>{formatDate(user.timestamp)}</td>
              <td className={TD}>
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
