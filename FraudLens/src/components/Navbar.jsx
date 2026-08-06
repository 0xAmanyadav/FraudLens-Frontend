import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Menu,
  Search,
  Bell,
  ShieldCheck,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { auth } from "../firebase/firebase";

export default function Navbar({ toggleSidebar }) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  const currentUser = auth.currentUser;
  const displayName = currentUser?.displayName;
  const displayInitial = displayName ? displayName.charAt(0).toUpperCase() : "U";
  const isDark = mounted && theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header
      className={`h-16 flex items-center justify-between px-4 w-full shrink-0 z-40 transition-colors duration-300 ${
        isDark
          ? "bg-slate-900 border-b border-slate-800"
          : "bg-white border-b border-slate-200"
      }`}
    >
      {/* ================= LEFT SIDE (Menu + Logo) ================= */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg transition-colors focus:outline-none ${
            isDark
              ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Menu size={22} />
        </button>

        <Link
          to="/app/dashboard"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <ShieldCheck size={26} className="text-blue-600" />
          <span
            className={`text-lg font-black tracking-tight hidden sm:block ${isDark ? "text-white" : "text-slate-900"}`}
          >
            FraudLens AI
          </span>
        </Link>
      </div>

      {/* ================= MIDDLE (Search) ================= */}
      <div
        className={`hidden md:flex items-center flex-1 max-w-md mx-4 border rounded-xl px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 transition-all ${
          isDark
            ? "bg-slate-800 border-slate-700"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <Search
          size={18}
          className={`mr-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}
        />
        <input
          type="text"
          placeholder="Scan anything..."
          className={`w-full bg-transparent border-none outline-none text-sm placeholder-slate-400 ${
            isDark
              ? "text-white placeholder-slate-500"
              : "text-slate-800 placeholder-slate-400"
          }`}
        />
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto shrink-0">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`p-2 rounded-full transition-colors ${
            isDark
              ? "text-slate-400 hover:text-yellow-400 hover:bg-slate-800"
              : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification Bell */}
        <button
          className={`p-2 rounded-full transition-colors relative ${
            isDark
              ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div
          className={`h-8 w-px mx-1 hidden sm:block ${isDark ? "bg-slate-700" : "bg-slate-200"}`}
        ></div>

        {/* ================= PROFILE DROPDOWN ================= */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-1 focus:outline-none hover:opacity-80 transition-opacity"
          >
            <div className="hidden sm:flex flex-col items-end">
              <span
                className={`text-sm font-bold leading-tight capitalize ${isDark ? "text-white" : "text-slate-900"}`}
              >
                {displayName || "User"}
              </span>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm font-bold text-sm">
              {displayInitial}
            </div>
          </button>

          {/* Popup Menu */}
          {isProfileOpen && (
            <div
              className={`absolute right-0 mt-3 w-56 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 border ${
                isDark
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-100"
              }`}
            >
              <div
                className={`sm:hidden px-4 py-3 border-b mb-2 ${
                  isDark ? "border-slate-700" : "border-slate-100"
                }`}
              >
                <p
                  className={`text-sm font-bold capitalize ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {displayName || "User"}
                </p>
                <p
                  className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Pro Plan Member
                </p>
              </div>

              <Link
                to="/app/dashboard/profile"
                onClick={() => setIsProfileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isDark
                    ? "text-slate-400 hover:bg-slate-700 hover:text-blue-400"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <User size={16} />
                My Profile
              </Link>

              <Link
                to="/app/dashboard/settings"
                onClick={() => setIsProfileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isDark
                    ? "text-slate-400 hover:bg-slate-700 hover:text-blue-400"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <Settings size={16} />
                Settings
              </Link>

              <div
                className={`h-px my-2 ${isDark ? "bg-slate-700" : "bg-slate-100"}`}
              ></div>

              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isDark
                    ? "text-red-400 hover:bg-red-900/20"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}