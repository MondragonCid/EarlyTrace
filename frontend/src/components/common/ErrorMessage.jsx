// Shown when a request fails. If the parent passes an onRetry function,
// a "Try again" button is shown that calls it.
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box state-error" role="alert">
      <p>
        <strong>Something went wrong.</strong> {message}
      </p>
      {onRetry && (
        <button type="button" className="btn btn-secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
