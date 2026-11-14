// Search box and role drop-down for the user list.
// These are controlled inputs: the parent page owns the values (search, role)
// and passes them in as props, together with functions to change them.

const ROLE_OPTIONS = [
  { value: 'ALL', label: 'All roles' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'INSTRUCTOR', label: 'Instructor' },
  { value: 'STUDENT', label: 'Student' },
];

const FIELD = 'mb-3 flex max-w-[360px] flex-[1_1_220px] flex-col gap-1';

function UserFilters({ search, role, onSearchChange, onRoleChange }) {
  return (
    <div className="mb-2 flex flex-wrap gap-4">
      <div className={FIELD}>
        <label htmlFor="user-search" className="text-sm font-semibold">
          Search by name or email
        </label>
        <input
          id="user-search"
          type="search"
          className="form-input"
          placeholder="e.g. Juan or juan@school.edu"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={FIELD}>
        <label htmlFor="role-filter" className="text-sm font-semibold">
          Role
        </label>
        <select
          id="role-filter"
          className="form-input"
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UserFilters;
