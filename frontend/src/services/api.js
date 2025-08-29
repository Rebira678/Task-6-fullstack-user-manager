import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
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
