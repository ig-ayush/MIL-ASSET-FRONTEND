import api from "./axios";
export const getEquipmentTypes = (params) => api.get("/equipment-types", { params });
export const getEquipmentType = (id) => api.get(`/equipment-types/${id}`);
export const createEquipmentType = (payload) => api.post("/equipment-types", payload);
