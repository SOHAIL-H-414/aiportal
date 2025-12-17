// In development, Vite sets this typically to undefined or we can fallback to localhost.
// In production, we should set VITE_API_URL variable.
// If VITE_API_URL is not set, we default to localhost:5000 for local dev convenience.

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE_URL;
