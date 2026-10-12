import axios from "axios";

export function apiErrorMessage(error, fallback) {
  if (!error.response) {
    return "Cannot reach the Smart Campus backend. Start the backend and make sure MySQL is running.";
  }

  const responseData = error.response.data;
  if (responseData?.message) return responseData.message;
  if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
    return responseData.errors.map((item) => item.defaultMessage).filter(Boolean).join(" ");
  }
  if (error.response.status === 401) return "Your session expired. Please sign in again.";
  if (error.response.status === 403) return "You do not have permission to perform this action.";
  if (error.response.status >= 500) return "The server could not complete this request. Check that MySQL is connected.";
  return fallback;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
