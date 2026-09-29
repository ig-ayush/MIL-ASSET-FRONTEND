import api from "./axios";
export const getAssignments = (params) => api.get("/assignments", { params });
export const getAssignment = (id) => api.get(`/assignments/${id}`);
export const createAssignment = (payload) => api.post("/assignments", payload);
