export const money = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(value || 0));

export const number = (value) =>
  new Intl.NumberFormat("en-IN").format(Number(value || 0));

export const date = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleDateString("en-IN");
};

export const dateTime = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString("en-IN");
};

export const titleCase = (value = "") =>
  String(value).toLowerCase().split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");

export const unwrapList = (data) => {
  if (Array.isArray(data)) return data;
  return data?.content || data?.data || data?.items || data?.results || [];
};