import api from "./axios";
export const getBases = (params) => api.get("/bases", { params });
export const getBase = (id) => api.get(`/bases/${id}`);
export const createBase = (payload) => api.post("/bases", payload);
