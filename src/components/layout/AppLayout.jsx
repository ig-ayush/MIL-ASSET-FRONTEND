import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#F5F7F2]">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-72">
        <Navbar onMenu={() => setOpen(true)} />
        <main key={location.pathname} className="px-4 pb-10 pt-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px] animate-[fadeIn_.18s_ease-out]"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}