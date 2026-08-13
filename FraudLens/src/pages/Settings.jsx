import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Lock, 
  Eye, 
  Globe, 
  Moon, 
  Save, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound 
} from "lucide-react";
import { useTheme } from "next-themes";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Settings() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser;

  // Load settings from localStorage
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("fraudlens_user_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      privacy: {
        profileVisible: true,
        allowMessages: true,
        shareAnalytics: false,
      },
    };
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Accurate active theme detection for instant UI update
  const currentTheme = resolvedTheme || theme;
  const isDark = mounted && currentTheme === "dark";

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleSaveChanges = () => {
    localStorage.setItem("fraudlens_user_settings", JSON.stringify(settings));
    showAlert("Settings saved successfully!", "success");
  };

  const handlePasswordReset = async () => {
    if (!currentUser?.email) {
      showAlert("No active email found for password reset.", "error");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, currentUser.email);
      showAlert(`Password reset link sent to ${currentUser.email}`, "success");
    } catch (err) {
      showAlert(err.message || "Failed to send password reset email.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (msg, type = "success") => {
    setAlertMessage({ msg, type });
    setTimeout(() => setAlertMessage(null), 4000);
  };

  const SettingToggle = ({
    label,
    icon: Icon,
    value,
    onChange,
    description,
  }) => (
    <div
      className={`flex items-start justify-between p-4 rounded-2xl transition-colors ${
        isDark ? "hover:bg-slate-800/60" : "hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1">
        <div className={`p-2 rounded-xl ${isDark ? "bg-slate-800 text-cyan-400" : "bg-blue-50 text-blue-600"}`}>
          <Icon size={18} />
        </div>
        <div>
          <p
            className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}
          >
            {label}
          </p>
          {description && (
            <p
              className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={onChange}
        aria-label={`Toggle ${label}`}
        className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
          value ? "bg-cyan-500 dark:bg-cyan-400" : isDark ? "bg-slate-700" : "bg-slate-300"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
            value ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-12 animate-in fade-in duration-300">
      
      {/* CUSTOM ALERT BANNER */}
      {alertMessage && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-4 ${
            alertMessage.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {alertMessage.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {alertMessage.msg}
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className={`text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
          Account Settings
        </h1>
        <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          Manage your platform preferences, security credentials, and data privacy options.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        
        {/* Theme Settings */}
        <div
          className={`rounded-3xl border p-6 sm:p-8 transition-colors duration-300 shadow-sm ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <h2
            className={`text-lg font-bold mb-1 flex items-center gap-2.5 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Moon size={18} />
            </div>
            Display Theme
          </h2>
          <p className={`text-sm mb-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Choose your preferred workspace visual mode
          </p>
          <div className="flex gap-3 flex-wrap">
            {["light", "dark"].map((mode) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={`px-5 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  currentTheme === mode
                    ? "bg-cyan-500 dark:bg-cyan-400 text-slate-950 shadow-md"
                    : isDark
                      ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {mode} Mode
              </button>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div
          className={`rounded-3xl border p-6 sm:p-8 transition-colors duration-300 shadow-sm ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <h2
            className={`text-lg font-bold mb-1 flex items-center gap-2.5 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Bell size={18} />
            </div>
            Notifications & Alerts
          </h2>
          <p className={`text-sm mb-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Control how you receive security alerts and threat notifications
          </p>
          <div className={`space-y-1 pt-2 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
            <SettingToggle
              label="Email Threat Alerts"
              icon={Bell}
              value={settings.notifications.email}
              onChange={() => handleToggle("notifications", "email")}
              description="Receive immediate alerts when critical vulnerabilities are found"
            />
            <SettingToggle
              label="SMS Emergency Notifications"
              icon={Bell}
              value={settings.notifications.sms}
              onChange={() => handleToggle("notifications", "sms")}
              description="Get text message notifications for high-priority security breaches"
            />
            <SettingToggle
              label="Browser Push Notifications"
              icon={Bell}
              value={settings.notifications.push}
              onChange={() => handleToggle("notifications", "push")}
              description="Enable real-time dashboard push notifications"
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div
          className={`rounded-3xl border p-6 sm:p-8 transition-colors duration-300 shadow-sm ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <h2
            className={`text-lg font-bold mb-1 flex items-center gap-2.5 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Lock size={18} />
            </div>
            Privacy Controls
          </h2>
          <p className={`text-sm mb-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Manage your workspace data visibility and analytics sharing
          </p>
          <div className={`space-y-1 pt-2 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
            <SettingToggle
              label="Public Profile Visibility"
              icon={Eye}
              value={settings.privacy.profileVisible}
              onChange={() => handleToggle("privacy", "profileVisible")}
              description="Allow other analysts to view your shared profile details"
            />
            <SettingToggle
              label="Allow Peer Messages"
              icon={Globe}
              value={settings.privacy.allowMessages}
              onChange={() => handleToggle("privacy", "allowMessages")}
              description="Let authorized platform users send community messages"
            />
            <SettingToggle
              label="Share Telemetry & Analytics"
              icon={Globe}
              value={settings.privacy.shareAnalytics}
              onChange={() => handleToggle("privacy", "shareAnalytics")}
              description="Help improve AI threat detection models by sharing anonymous scan metrics"
            />
          </div>
        </div>

        {/* Security Credentials Settings */}
        <div
          className={`rounded-3xl border p-6 sm:p-8 transition-colors duration-300 shadow-sm ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <h2
            className={`text-lg font-bold mb-1 flex items-center gap-2.5 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
              <ShieldCheck size={18} />
            </div>
            Security & Authentication
          </h2>
          <p className={`text-sm mb-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Keep your account secure with robust credentials
          </p>
          <div className="space-y-3">
            <button
              onClick={handlePasswordReset}
              disabled={loading}
              className={`w-full px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                isDark
                  ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <span className="flex items-center gap-3">
                <KeyRound size={16} className="text-cyan-500" />
                Change Password (Send Reset Email)
              </span>
              <ChevronRight size={16} />
            </button>
            <div className={`p-4 rounded-2xl border ${isDark ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold">Two-Factor Authentication (2FA)</p>
                  <p className="text-[11px] text-slate-500">Secured via Firebase Auth Session</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-black text-[10px] uppercase">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveChanges}
            className="px-8 py-3.5 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-400 dark:hover:bg-cyan-300 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}