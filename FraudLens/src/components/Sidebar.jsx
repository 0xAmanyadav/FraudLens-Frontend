import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  ScanSearch,
  Link as LinkIcon,
  MessageSquare,
  Image as ImageIcon,
  QrCode,
  Puzzle,
  Activity,
  History,
  Settings,
  LayoutDashboard,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";
  
  // 🛠️ FIX 2: Copilot aur Reports ko hata diya gaya hai
  const menuItems = [
    { name: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
    { name: "AI Scan Center", path: "/app/dashboard/scan", icon: ScanSearch },
    { name: "URL Scanner", path: "/app/dashboard/url", icon: LinkIcon },
    { name: "Message Scanner", path: "/app/dashboard/message", icon: MessageSquare },
    { name: "QR Scanner", path: "/app/dashboard/qr", icon: QrCode },
    { name: "Browser Extension", path: "/app/dashboard/extension", icon: Puzzle },
    { name: "Threat Intelligence", path: "/app/dashboard/intelligence", icon: Activity },
    { name: "History", path: "/app/dashboard/history", icon: History },
  ];

  return (
    <aside
      // 🛠️ FIX 3: Close hone par w-20 (Icon only) hoga. Navbar ke niche aayega isliye absolute/fixed hata diya.
      className={`relative z-20 transition-all duration-300 ease-in-out flex flex-col shrink-0 h-full ${
        isOpen ? "w-64" : "w-20"
      } ${
        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      } border-r`}
    >
      {/* 🛠️ FIX 4: Scrollbar Hide Classes ([&::-webkit-scrollbar]:hidden) */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            title={!isOpen ? item.name : ""} // Close hone par hover karne se naam dikhega
            className={({ isActive }) =>
              `w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isOpen ? "justify-start" : "justify-center"
              } ${
                isActive
                  ? isDark
                    ? "bg-blue-600/20 text-blue-400 font-bold"
                    : "bg-blue-50 text-blue-700 font-bold"
                  : isDark
                  ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200 font-medium"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={20}
                  className={`shrink-0 ${isOpen ? "mr-3" : "mr-0"} ${
                    isActive
                      ? "text-blue-600"
                      : isDark
                      ? "text-slate-500"
                      : "text-slate-400"
                  }`}
                />
                {/* 🛠️ FIX 5: Jab sidebar open hoga tabhi text dikhega */}
                {isOpen && <span className="text-sm truncate">{item.name}</span>}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div
        className={`p-4 border-t shrink-0 ${
          isDark ? "border-slate-800" : "border-slate-100"
        }`}
      >
        <NavLink
          to="/app/dashboard/settings"
          title={!isOpen ? "Settings" : ""}
          className={({ isActive }) =>
            `w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-sm ${
              isOpen ? "justify-start" : "justify-center"
            } ${
              isActive
                ? isDark
                  ? "bg-blue-600/20 text-blue-400 font-bold"
                  : "bg-blue-50 text-blue-700 font-bold"
                : isDark
                ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200 font-medium"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
            }`
          }
        >
          <Settings
            size={20}
            className={`shrink-0 ${isOpen ? "mr-3" : "mr-0"} ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          />
          {isOpen && <span>Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
}