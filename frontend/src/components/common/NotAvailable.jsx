// Shown when a feature needs data the backend does not provide yet.
// `feature` = what the user wanted, `missing` = what the backend still needs.
function NotAvailable({ feature, missing }) {
  return (
    <div className="state-box state-info" role="note">
      <p className="state-title">{feature}: not available yet</p>
      <p>{missing}</p>
    </div>
  );
}

export default NotAvailable;
