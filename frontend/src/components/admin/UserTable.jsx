// Shows the users in a table.
// Props:
//   users           - the list of users to show
//   onResetPassword - called with a user when "Reset password" is clicked
//   onChangeStatus  - called with a user and the new status (ACTIVE or INACTIVE)
function UserTable({ users, onResetPassword, onChangeStatus }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-sm text-slate-600">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-slate-200">
              <td className="p-3">{user.fullName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.roleType}</td>
              <td className="p-3">{user.status}</td>
              <td className="flex gap-2 p-3">
                <button
                  onClick={() => onResetPassword(user)}
                  className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
                >
                  Reset password
                </button>
                {user.status === 'INACTIVE' ? (
                  <button
                    onClick={() => onChangeStatus(user, 'ACTIVE')}
                    className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
                  >
                    Activate
                  </button>
                ) : (
                  <button
                    onClick={() => onChangeStatus(user, 'INACTIVE')}
                    className="rounded-md bg-red-50 px-3 py-1 text-sm font-semibold text-red-800 hover:bg-red-100"
                  >
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
