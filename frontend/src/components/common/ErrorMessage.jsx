// Shown when a request fails. If the parent passes an onRetry function,
// a "Try again" button is shown that calls it.
function ErrorMessage({ message, onRetry }) {
  return (
    <div
      className="my-4 rounded-lg border border-error-border bg-error-bg p-5 text-center text-error"
      role="alert"
    >
      <p className="my-1">
        <strong>Something went wrong.</strong> {message}
      </p>
      {onRetry && (
        <button type="button" className="btn btn-secondary mt-3" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
