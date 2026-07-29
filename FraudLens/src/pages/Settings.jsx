import React, { useState } from "react";
import { Bell, Lock, Eye, Globe, Moon, Save, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [settings, setSettings] = useState({
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
  });

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const SettingToggle = ({
    label,
    icon: Icon,
    value,
    onChange,
    description,
  }) => (
    <div
      className={`flex items-start justify-between p-4 rounded-lg transition-colors ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}
    >
      <div className="flex items-start gap-3 flex-1">
        <Icon
          size={18}
          className={`mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}
        />
        <div>
          <p
            className={`font-medium text-sm ${isDark ? "text-white" : "text-slate-900"}`}
          >
            {label}
          </p>
          {description && (
            <p
              className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-600"}`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          value ? "bg-blue-600" : isDark ? "bg-slate-700" : "bg-slate-300"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
            value ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Settings
          </h1>
          <p
            className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            Manage your preferences and account settings
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <div
            className={`rounded-2xl border p-6 transition-colors duration-300 ${
              isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <h2
              className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              <Moon size={20} className="text-purple-600" />
              Theme
            </h2>
            <p
              className={`text-sm mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              Choose your preferred display mode
            </p>
            <div className="flex gap-3 flex-wrap">
              {["light", "dark"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTheme(mode)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    mounted && theme === mode
                      ? "bg-blue-600 text-white"
                      : isDark
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
                </button>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div
            className={`rounded-2xl border p-6 transition-colors duration-300 ${
              isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <h2
              className={`text-lg font-bold mb-1 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              <Bell size={20} className="text-blue-600" />
              Notifications
            </h2>
            <p
              className={`text-sm mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              Control how you receive updates and alerts
            </p>
            <div
              className={`border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}
            >
              <SettingToggle
                label="Email Notifications"
                icon={Bell}
                value={settings.notifications.email}
                onChange={() => handleToggle("notifications", "email")}
                description="Receive email alerts for important events"
              />
              <SettingToggle
                label="SMS Notifications"
                icon={Bell}
                value={settings.notifications.sms}
                onChange={() => handleToggle("notifications", "sms")}
                description="Get text message notifications"
              />
              <SettingToggle
                label="Push Notifications"
                icon={Bell}
                value={settings.notifications.push}
                onChange={() => handleToggle("notifications", "push")}
                description="Enable browser push notifications"
              />
            </div>
          </div>

          {/* Privacy Settings */}
          <div
            className={`rounded-2xl border p-6 transition-colors duration-300 ${
              isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <h2
              className={`text-lg font-bold mb-1 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              <Lock size={20} className="text-green-600" />
              Privacy
            </h2>
            <p
              className={`text-sm mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              Manage your privacy and data sharing preferences
            </p>
            <div
              className={`border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}
            >
              <SettingToggle
                label="Public Profile"
                icon={Eye}
                value={settings.privacy.profileVisible}
                onChange={() => handleToggle("privacy", "profileVisible")}
                description="Allow others to view your profile"
              />
              <SettingToggle
                label="Allow Messages"
                icon={Globe}
                value={settings.privacy.allowMessages}
                onChange={() => handleToggle("privacy", "allowMessages")}
                description="Let others send you messages"
              />
              <SettingToggle
                label="Share Analytics"
                icon={Globe}
                value={settings.privacy.shareAnalytics}
                onChange={() => handleToggle("privacy", "shareAnalytics")}
                description="Help us improve by sharing usage data"
              />
            </div>
          </div>

          {/* Security Settings */}
          <div
            className={`rounded-2xl border p-6 transition-colors duration-300 ${
              isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <h2
              className={`text-lg font-bold mb-1 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              <Lock size={20} className="text-red-600" />
              Security
            </h2>
            <p
              className={`text-sm mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              Keep your account secure
            </p>
            <div className="space-y-2">
              <button
                className={`w-full px-4 py-3 rounded-lg font-medium text-sm flex items-center justify-between transition-colors ${
                  isDark
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Lock size={16} />
                  Change Password
                </span>
                <ChevronRight size={16} />
              </button>
              <button
                className={`w-full px-4 py-3 rounded-lg font-medium text-sm flex items-center justify-between transition-colors ${
                  isDark
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Lock size={16} />
                  Two-Factor Authentication
                </span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
