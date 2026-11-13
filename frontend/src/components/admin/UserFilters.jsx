// Search box and role drop-down for the user list.
// These are controlled inputs: the parent page owns the values (search, role)
// and passes them in as props, together with functions to change them.

const ROLE_OPTIONS = [
  { value: 'ALL', label: 'All roles' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'INSTRUCTOR', label: 'Instructor' },
  { value: 'STUDENT', label: 'Student' },
];

function UserFilters({ search, role, onSearchChange, onRoleChange }) {
  return (
    <div className="filters">
      <div className="form-field">
        <label htmlFor="user-search">Search by name or email</label>
        <input
          id="user-search"
          type="search"
          placeholder="e.g. Juan or juan@school.edu"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="role-filter">Role</label>
        <select id="role-filter" value={role} onChange={(e) => onRoleChange(e.target.value)}>
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
