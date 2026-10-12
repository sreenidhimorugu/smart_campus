```javascript
import axios from "axios";

export function apiErrorMessage(error, fallback) {
  if (!error.response) {
    return "Cannot reach the Smart Campus backend. Check your internet connection and backend URL.";
  }

  const responseData = error.response.data;
  if (responseData?.message) return responseData.message;
  if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
    return responseData.errors.map((item) => item.defaultMessage).filter(Boolean).join(" ");
  }
  if (error.response.status === 401) return "Your session expired. Please sign in again.";
  if (error.response.status === 403) return "You do not have permission to perform this action.";
  if (error.response.status >= 500) return "The server could not complete this request. Check the backend logs.";
  return fallback;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://smart-campus-backend-ak8a.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```