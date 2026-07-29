import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // 🛠️ FIX 1: Yahan 'dark:bg-slate-950' aur 'dark:text-slate-100' add kiya hai
    <div className="absolute inset-0 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 w-full overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* 🛠️ FIX 2: Yahan '<main>' tag mein 'dark:bg-slate-900/50' add kiya hai */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden bg-slate-50/50 dark:bg-slate-900/50">
          <div className="w-full p-4 md:p-6 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}