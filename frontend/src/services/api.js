import axios from "axios";

// Use your Render backend URL here
const api = axios.create({
  baseURL: "https://task-6-fullstack-user-manager-4.onrender.com/api",
  // If you want to use environment variables instead:
  // baseURL: import.meta.env.VITE_API_URL
});

export const Auth = {
  login: (data) => api.post("/auth/login", data).then((r) => r.data),
  register: (data) => api.post("/auth/register", data).then((r) => r.data),
  logout: () => api.post("/auth/logout").then((r) => r.data),
};

export const Users = {
  list: (q) => api.get("/users", { params: { q } }).then((r) => r.data),
  create: (data) => api.post("/users", data).then((r) => r.data),
  update: (id, data) => api.put(`/users/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/users/${id}`).then((r) => r.data),
};

export default api;
