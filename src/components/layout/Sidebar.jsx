import { NavLink } from "react-router-dom";
import {
  X,
  Shield,
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  ArrowLeftRight,
  UserRoundCog,
  ReceiptText,
  Building2,
  PackageSearch,
  Users,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const primary = [
  [
    "/dashboard",
    "Dashboard",
    LayoutDashboard,
    ["ADMIN", "BASE_COMMANDER", "LOGISTICS_OFFICER"],
  ],
  [
    "/inventory",
    "Inventory",
    Boxes,
    ["ADMIN", "BASE_COMMANDER", "LOGISTICS_OFFICER"],
  ],
  [
    "/purchases",
    "Purchases",
    ShoppingCart,
    ["ADMIN", "LOGISTICS_OFFICER", "BASE_COMMANDER"],
  ],
  [
    "/transfers",
    "Transfers",
    ArrowLeftRight,
    ["ADMIN", "LOGISTICS_OFFICER", "BASE_COMMANDER"],
  ],
  [
    "/assignments",
    "Assignments",
    UserRoundCog,
    ["ADMIN", "LOGISTICS_OFFICER", "BASE_COMMANDER"],
  ],
  [
    "/expenditures",
    "Expenditures",
    ReceiptText,
    ["ADMIN", "LOGISTICS_OFFICER", "BASE_COMMANDER"],
  ],
];
const admin = [
  ["/bases", "Bases", Building2],
  ["/equipment-types", "Equipment Types", PackageSearch],
  ["/users", "Users", Users],
  ["/audit-logs", "Audit Logs", ClipboardList],
];

export default function Sidebar({ open, onClose }) {
  const { user, isAdmin, logout } = useAuth();
  const link = (item) => {
    const [to, label, Icon, roles] = item;
    if (roles && !roles.includes(user?.role)) return null;
    return (
      <NavLink
        key={to}
        to={to}
        onClick={onClose}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-lime-100 text-[#3F6212]" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`
        }
      >
        <Icon size={18} />
        <span>{label}</span>
      </NavLink>
    );
  };
  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#3F6212] text-white">
              <Shield size={22} />
            </div>
            <div>
              <p className="font-bold text-slate-900">MIL-ASSET</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Command Logistics
              </p>
            </div>
          </div>
          <button className="lg:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Operations
          </p>
          <div className="space-y-1">{primary.map(link)}</div>
          {isAdmin && (
            <>
              <p className="mb-2 mt-7 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Administration
              </p>
              <div className="space-y-1">
                {admin.map(([to, label, Icon]) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-lime-100 text-[#3F6212]" : "text-slate-600 hover:bg-slate-100"}`
                    }
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                ))}
              </div>
            </>
          )}
        </nav>
        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 rounded-xl bg-slate-50 p-3">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user?.name || "User"}
            </p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
            <span className="mt-2 badge bg-lime-100 text-[#3F6212]">
              {user?.role}
            </span>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
