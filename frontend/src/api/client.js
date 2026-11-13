// Reusable fetch helper used by every file in src/api/.
// It sends the request, checks if it worked, and returns the parsed data.
// If something goes wrong it throws an Error with a readable message,
// so pages can simply use try/catch and show error.message.

export async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  } catch {
    // fetch() itself only fails when the server cannot be reached at all.
    throw new Error('Could not reach the server. Check your connection and try again.');
  }

  // Read the body as text first, because some endpoints return
  // JSON, some return plain text, and some return nothing.
  const text = await response.text();

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status, text));
  }

  if (text === '') {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text; // plain-text reply, e.g. "Course 1 successfully deleted"
  }
}

function getErrorMessage(status, text) {
  // Spring Boot errors are JSON like { "status": 500, "error": "...", "message": "..." }
  try {
    const data = JSON.parse(text);
    if (data.message) return data.message;
    if (data.error) return `${data.error} (${status})`;
  } catch {
    // Short plain-text messages are shown as they are; HTML pages are ignored.
    if (text && text.length < 200 && !text.trim().startsWith('<')) return text;
  }

  if (status >= 500) {
    return `The server had a problem (error ${status}). Make sure the backend is running and try again.`;
  }
  return `Request failed (error ${status}).`;
}
