import { useState } from 'react';
import { updateUser } from '../../api/userApi.js';

const MIN_LENGTH = 8;

// Controlled form for setting a new password for one user.
// Props:
//   user    - the user whose password is being reset
//   onSaved - called with the updated user after the backend saves it
//   onCancel - called when the admin closes the form
function ResetPasswordForm({ user, onSaved, onCancel }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Returns an object with one message per invalid field (empty = all valid).
  function validate() {
    const newErrors = {};

    if (newPassword.length < MIN_LENGTH) {
      newErrors.newPassword = `Password must be at least ${MIN_LENGTH} characters.`;
    }

    if (confirmPassword === '') {
      newErrors.confirmPassword = 'Please confirm the new password.';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    setSaveError('');

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return; // do not send anything if the form is invalid
    }

    setSaving(true);
    try {
      // The backend replaces all four fields, so we send the full user
      // with the new password in passwordHash.
      const updatedUser = await updateUser(user.id, {
        email: user.email,
        fullName: user.fullName,
        roleType: user.roleType,
        passwordHash: newPassword,
      });
      onSaved(updatedUser);
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="card panel" aria-labelledby="reset-title">
      <h2 id="reset-title">Reset password for {user.fullName}</h2>
      <p className="muted">{user.email}</p>

      {saveError && (
        <p className="message message-error" role="alert">
          Could not save the new password. {saveError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            autoFocus
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            aria-invalid={errors.newPassword ? 'true' : 'false'}
            aria-describedby="new-password-help"
          />
          <p id="new-password-help" className={errors.newPassword ? 'field-error' : 'field-help'}>
            {errors.newPassword || `At least ${MIN_LENGTH} characters.`}
          </p>
        </div>

        <div className="form-field">
          <label htmlFor="confirm-password">Confirm new password</label>
          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
          />
          {errors.confirmPassword && (
            <p id="confirm-password-error" className="field-error">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save new password'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default ResetPasswordForm;
