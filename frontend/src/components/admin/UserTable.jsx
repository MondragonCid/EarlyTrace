// Shows the users in a table.
// Props:
//   users           - the list of users to show
//   onResetPassword - called with a user when "Reset password" is clicked
function UserTable({ users, onResetPassword }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-sm text-slate-600">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-slate-200">
              <td className="p-3">{user.fullName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.roleType}</td>
              <td className="p-3">
                <button
                  onClick={() => onResetPassword(user)}
                  className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
                >
                  Reset password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
