// Instructors waiting for approval, with Approve and Reject buttons.
// Props:
//   users          - the users whose status is PENDING
//   onChangeStatus - called with a user and the new status (ACTIVE or INACTIVE)
function PendingApprovals({ users, onChangeStatus }) {
  return (
    <div className="mb-8">
      <h2 className="mb-3 text-xl font-bold">Pending instructor approvals</h2>

      {users.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
          No instructors are waiting for approval.
        </p>
      ) : (
        <div className="grid gap-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4"
            >
              <div>
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onChangeStatus(user, 'ACTIVE')}
                  className="rounded-md bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900"
                >
                  Approve
                </button>
                <button
                  onClick={() => onChangeStatus(user, 'INACTIVE')}
                  className="rounded-md border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-50"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PendingApprovals
