import { formatDate } from '../../utils/formatDate.js';
import { ROLE_LABELS } from '../../utils/roles.js';

// A short list of the newest accounts.
// Props:
//   users - array of users, already sorted newest first
function RecentUsersList({ users }) {
  return (
    <ul className="divide-y divide-line rounded-lg border border-line bg-white">
      {users.map((user) => (
        <li key={user.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
          <div className="min-w-0">
            <p className="font-semibold">{user.fullName}</p>
            <p className="break-all text-sm text-muted">{user.email}</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-block rounded bg-subtle px-2 py-0.5 text-[0.85rem] font-semibold">
              {ROLE_LABELS[user.roleType] || user.roleType}
            </span>
            <span className="text-muted">Joined {formatDate(user.timestamp)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default RecentUsersList;
