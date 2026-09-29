import api from "./axios";
export const loginRequest = (payload) => api.post("/auth/login", payload);
