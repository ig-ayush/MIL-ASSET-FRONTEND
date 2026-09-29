import api from "./axios";
export const getTransfers = (params) => api.get("/transfers", { params });
export const getTransfer = (id) => api.get(`/transfers/${id}`);
export const createTransfer = (payload) => api.post("/transfers", payload);
