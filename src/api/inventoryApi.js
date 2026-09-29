import api from "./axios";
export const getInventory = (params) => api.get("/inventory", { params });
