import React, { useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit3,
  Trash2,
  CheckCircle2,
  Sparkles,
  Lock,
} from "lucide-react";
import { auth } from "../firebase/firebase";

export default function ProfilePage() {
  const currentUser = auth.currentUser;

  // Default User Fallback Details
  const userName = currentUser?.displayName || "Aman Yadav";
  const userEmail = currentUser?.email || "aman@fraudlens.ai";

  // Format Account creation date from Firebase Metadata or fallback
  const creationDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "November 2025";

  // State for Coming Soon Alert Banner
  const [alertMessage, setAlertMessage] = useState(null);

  const handleComingSoon = (actionName) => {
    setAlertMessage(`${actionName} feature is coming soon in the next update!`);
    setTimeout(() => setAlertMessage(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-900 dark:text-slate-100 pb-12 relative">
      {/* COMING SOON ALERT BANNER */}
      {alertMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl bg-indigo-600 text-white flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-4">
          <Sparkles size={18} />
          {alertMessage}
        </div>
      )}

      {/* HEADER TITLE */}
      <div>
        <h1 className="text-3xl font-black flex items-center gap-3">
          <User className="text-indigo-600 dark:text-indigo-400" size={32} />
          My Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Manage your account information, security credentials, and
          preferences.
        </p>
      </div>

      {/* MAIN PROFILE CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 relative overflow-hidden">
        {/* Top Profile Info Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          {/* Default Avatar with Initial */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-indigo-500/20">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-xl shadow-md border-2 border-white dark:border-slate-900"
              title="Verified Account"
            >
              <CheckCircle2 size={14} />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight">{userName}</h2>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email Field */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {userEmail}
              </p>
            </div>
          </div>

          {/* Member Since Field */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Account Since
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {creationDate}
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge Info */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-3 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
          <Lock size={16} />
          Your account is authenticated via Firebase Security and protected with
          end-to-end encryption.
        </div>

        {/* Action Buttons (Edit & Delete -> Coming Soon) */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => handleComingSoon("Edit Profile")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
          >
            <Edit3 size={16} /> Edit Profile
          </button>

          <button
            onClick={() => handleComingSoon("Delete Account")}
            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-600 dark:text-slate-300 hover:text-red-600 font-bold rounded-2xl text-sm transition-all flex items-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
