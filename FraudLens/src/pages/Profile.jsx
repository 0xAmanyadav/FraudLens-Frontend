import React from "react";
import { User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { useTheme } from "next-themes";

export default function Profile() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const userProfile = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 15, 2024",
    planType: "Pro",
  };

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
            My Profile
          </h1>
          <p
            className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div
          className={`rounded-2xl border p-8 transition-colors duration-300 ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          {/* Avatar Section */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b"
            style={{ borderColor: isDark ? "#1e293b" : "#e2e8f0" }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {userProfile.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2
                className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
              >
                {userProfile.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Shield size={16} className="text-blue-600" />
                <span
                  className={`text-sm font-semibold ${isDark ? "text-slate-400" : "text-slate-600"}`}
                >
                  {userProfile.planType} Member
                </span>
              </div>
            </div>
          </div>

          {/* Profile Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                <Mail size={16} className="text-blue-600" />
                Email Address
              </label>
              <p
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                {userProfile.email}
              </p>
            </div>

            {/* Phone */}
            <div>
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                <Phone size={16} className="text-green-600" />
                Phone Number
              </label>
              <p
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                {userProfile.phone}
              </p>
            </div>

            {/* Location */}
            <div>
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                <MapPin size={16} className="text-red-600" />
                Location
              </label>
              <p
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                {userProfile.location}
              </p>
            </div>

            {/* Join Date */}
            <div>
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                <Calendar size={16} className="text-purple-600" />
                Member Since
              </label>
              <p
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                {userProfile.joinDate}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <div
            className="mt-8 pt-6 border-t"
            style={{ borderColor: isDark ? "#1e293b" : "#e2e8f0" }}
          >
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
