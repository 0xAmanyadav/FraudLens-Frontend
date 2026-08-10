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
  const displayName = currentUser?.displayName || "Aman Yadav"; // Fallback to user summary profile name
  const displayInitial = displayName ? displayName.charAt(0).toUpperCase() : "A";
  
  // Safe theme mounting check to prevent hydration mismatch
  const isDark = mounted && (theme === "dark" || document.documentElement.classList.contains("dark"));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
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
    // Clear any active tokens/sessions if required
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      className={`h-16 flex items-center justify-between px-4 sm:px-6 w-full shrink-0 z-40 transition-colors duration-300 ${
        isDark
          ? "bg-slate-900/90 border-b border-slate-800 backdrop-blur-md text-white"
          : "bg-white/90 border-b border-slate-200 backdrop-blur-md text-slate-900"
      }`}
    >
      {/* ================= LEFT SIDE (Menu Toggle + Logo) ================= */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className={`p-2 rounded-xl transition-colors focus:outline-none ${
            isDark
              ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Menu size={22} />
        </button>

        <Link
          to="/app/dashboard"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <ShieldCheck size={22} />
          </div>
          <span className="text-lg font-black tracking-tight hidden sm:block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
            FraudLens AI
          </span>
        </Link>
      </div>

      {/* ================= MIDDLE (Search Bar) ================= */}
      <div
        className={`hidden md:flex items-center flex-1 max-w-md mx-6 border rounded-2xl px-3.5 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all ${
          isDark
            ? "bg-slate-800/60 border-slate-700/80 text-white"
            : "bg-slate-50 border-slate-200 text-slate-800"
        }`}
      >
        <Search
          size={18}
          className={`mr-2.5 shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`}
        />
        <input
          type="text"
          placeholder="Search scans, threats, logs..."
          className="w-full bg-transparent border-none outline-none text-sm placeholder-slate-400 dark:placeholder-slate-500"
        />
      </div>

      {/* ================= RIGHT SIDE (Actions & Profile) ================= */}
      <div className="flex items-center gap-2 sm:gap-3.5 ml-auto shrink-0">
        
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle Theme"
          className={`p-2.5 rounded-xl transition-colors ${
            isDark
              ? "text-slate-400 hover:text-yellow-400 hover:bg-slate-800"
              : "text-slate-500 hover:text-blue-600 hover:bg-slate-100"
          }`}
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Notification Bell */}
        <button
          aria-label="Notifications"
          className={`p-2.5 rounded-xl transition-colors relative ${
            isDark
              ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Bell size={19} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
        </button>

        <div
          className={`h-6 w-px mx-1 hidden sm:block ${isDark ? "bg-slate-700" : "bg-slate-200"}`}
        ></div>

        {/* ================= PROFILE DROPDOWN ================= */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-expanded={isProfileOpen}
            className="flex items-center gap-3 pl-1 focus:outline-none group"
          >
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold leading-tight capitalize text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                {displayName}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">
                Online
              </span>
            </div>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md font-bold text-sm tracking-wider ring-2 ring-white dark:ring-slate-800">
              {displayInitial}
            </div>
          </button>

          {/* Popup Dropdown Menu */}
          {isProfileOpen && (
            <div
              className={`absolute right-0 mt-3 w-60 rounded-2xl shadow-2xl py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 border ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-slate-100"
                  : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              {/* Mobile View Profile Header Info */}
              <div
                className={`sm:hidden px-4 py-3 border-b mb-1.5 ${
                  isDark ? "border-slate-700" : "border-slate-100"
                }`}
              >
                <p className="text-sm font-bold capitalize truncate">
                  {displayName}
                </p>
                <p className="text-xs text-blue-600 dark:text-cyan-400 font-medium">
                  Cyber Security Pro Member
                </p>
              </div>

              <Link
                to="/app/dashboard/profile"
                onClick={() => setIsProfileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${
                  isDark
                    ? "hover:bg-slate-700/70 hover:text-blue-400 text-slate-300"
                    : "hover:bg-slate-50 hover:text-blue-600 text-slate-700"
                }`}
              >
                <User size={16} className="text-blue-500" />
                My Profile
              </Link>

              <Link
                to="/app/dashboard/settings"
                onClick={() => setIsProfileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${
                  isDark
                    ? "hover:bg-slate-700/70 hover:text-blue-400 text-slate-300"
                    : "hover:bg-slate-50 hover:text-blue-600 text-slate-700"
                }`}
              >
                <Settings size={16} className="text-indigo-500" />
                Account Settings
              </Link>

              <div
                className={`h-px my-1.5 ${isDark ? "bg-slate-700" : "bg-slate-100"}`}
              ></div>

              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${
                  isDark
                    ? "text-red-400 hover:bg-red-950/40"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
