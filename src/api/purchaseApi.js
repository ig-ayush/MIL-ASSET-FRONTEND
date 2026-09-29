import api from "./axios";
export const getPurchases = (params) => api.get("/purchases", { params });
export const getPurchase = (id) => api.get(`/purchases/${id}`);
export const createPurchase = (payload) => api.post("/purchases", payload);
