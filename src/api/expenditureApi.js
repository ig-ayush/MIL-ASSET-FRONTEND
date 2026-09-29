import api from "./axios";
export const getExpenditures = (params) => api.get("/expenditures", { params });
export const getExpenditure = (id) => api.get(`/expenditures/${id}`);
export const createExpenditure = (payload) => api.post("/expenditures", payload);
