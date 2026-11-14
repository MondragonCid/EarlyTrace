import { request } from './client.js';

// Matches UserController.java: @RequestMapping("/api/users")

// The backend sends passwordHash with every user. We remove it here,
// right after it arrives, so no page can ever display it.
function removePassword(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

// GET /api/users/getAllUsers
export async function getAllUsers() {
  const users = await request('/api/users/getAllUsers');
  return (users || []).map(removePassword);
}

// PUT /api/users/updateUser/{id}
// The backend replaces email, passwordHash, fullName and roleType together,
// so `user` must contain all four fields.
export async function updateUser(id, user) {
  const updated = await request(`/api/users/updateUser/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
  return removePassword(updated);
}
