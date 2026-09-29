import { Menu, MapPin, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const titles = { "/dashboard":"Dashboard","/inventory":"Inventory","/purchases":"Purchases","/transfers":"Transfers","/assignments":"Assignments","/expenditures":"Expenditures","/bases":"Bases","/equipment-types":"Equipment Types","/users":"Users","/audit-logs":"Audit Logs","/unauthorized":"Access Denied" };

export default function Navbar({ onMenu }) {
  const { user } = useAuth();
  const location = useLocation();
  const title = titles[location.pathname] || "Command Center";
  return <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
    <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3"><button onClick={onMenu} className="rounded-xl p-2 hover:bg-slate-100 lg:hidden" aria-label="Open navigation"><Menu/></button><div><p className="text-lg font-bold text-slate-900">{title}</p><p className="hidden text-xs text-slate-500 sm:block">Military Asset Management System</p></div></div>
      <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:flex"><MapPin size={15} className="text-[#3F6212]"/><span className="text-sm font-medium text-slate-700">{user?.role === "ADMIN" ? "All Bases" : user?.baseName || "Assigned Base"}</span><ChevronDown size={14} className="text-slate-400"/></div><div className="grid h-9 w-9 place-items-center rounded-full bg-[#3F6212] text-sm font-bold text-white">{(user?.name || "U").charAt(0).toUpperCase()}</div></div>
    </div>
  </header>;
}