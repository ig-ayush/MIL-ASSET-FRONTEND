import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Purchases from "../pages/Purchases";
import Transfers from "../pages/Transfers";
import Assignments from "../pages/Assignments";
import Expenditures from "../pages/Expenditures";
import Bases from "../pages/Bases";
import EquipmentTypes from "../pages/EquipmentTypes";
import Users from "../pages/Users";
import AuditLogs from "../pages/AuditLogs";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import AppLayout from "../components/layout/AppLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/expenditures" element={<Expenditures />} />
          <Route element={<RoleRoute roles={["ADMIN"]} />}>
            <Route path="/bases" element={<Bases />} />
            <Route path="/equipment-types" element={<EquipmentTypes />} />
            <Route path="/users" element={<Users />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}