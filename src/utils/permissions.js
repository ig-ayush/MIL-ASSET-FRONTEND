export const ROLE = {
  ADMIN: "ADMIN",
  COMMANDER: "BASE_COMMANDER",
  LOGISTICS: "LOGISTICS_OFFICER"
};

export const canAccess = (role, allowed) => allowed.includes(role);
