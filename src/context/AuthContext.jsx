import { createContext, useContext, useMemo, useState } from "react";
import { loginRequest } from "../api/authApi";
import { getApiError } from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });
  const [initializing] = useState(false);

  const login = async (email, password) => {
    try {
      const { data } = await loginRequest({ email, password });
      if (!data?.token) throw new Error("Login response did not contain a token.");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        userId: data.userId, name: data.name, email: data.email, role: data.role,
        baseId: data.baseId, baseName: data.baseName
      }));
      setToken(data.token);
      setUser(data);
      return data;
    } catch (error) {
      throw new Error(getApiError(error, "Unable to sign in. Please check your credentials."));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    user, token, isAuthenticated: Boolean(token && user), initializing,
    login, logout,
    hasRole: (role) => user?.role === role,
    hasAnyRole: (roles) => roles.includes(user?.role),
    isAdmin: user?.role === "ADMIN",
    isCommander: user?.role === "BASE_COMMANDER",
    isLogisticsOfficer: user?.role === "LOGISTICS_OFFICER"
  }), [user, token, initializing]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);