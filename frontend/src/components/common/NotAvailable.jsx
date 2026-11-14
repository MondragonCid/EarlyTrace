// Shown when a feature needs data the backend does not provide yet.
// `feature` = what the user wanted, `missing` = what the backend still needs.
function NotAvailable({ feature, missing }) {
  return (
    <div className="my-4 rounded-lg border border-info-border bg-info-bg p-5" role="note">
      <p className="my-1 font-semibold">{feature}: not available yet</p>
      <p className="my-1">{missing}</p>
    </div>
  );
}

export default NotAvailable;
