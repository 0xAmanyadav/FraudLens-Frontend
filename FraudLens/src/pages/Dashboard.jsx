import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link as LinkIcon,
  MessageSquare,
  Upload,
  QrCode,
  TrendingUp,
  Activity,
  UserCheck,
  Lock,
  Zap,
  ArrowRight,
  ShieldCheck,
  Eye,
  ShieldAlert,
  Clock,
} from "lucide-react";
import { Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { auth } from "../firebase/firebase";
import { fetchScanHistory } from "../services/api";
import ScanReportModal from "../components/ScanReportModal"; // Import the detailed report modal we built earlier

const trendData = [
  { name: "Jan", threats: 40, safe: 120 },
  { name: "Feb", threats: 30, safe: 150 },
  { name: "Mar", threats: 70, safe: 200 },
  { name: "Apr", threats: 45, safe: 180 },
  { name: "May", threats: 90, safe: 310 },
  { name: "Jun", threats: 65, safe: 270 },
  { name: "Jul", threats: 110, safe: 400 },
];

export default function DashboardHome() {
  const currentUser = auth.currentUser;
  
  // Safe fallbacks so raw/undefined data never appears directly on UI
  const userName = currentUser?.displayName || currentUser?.email?.split("@")[0] || "Secured User";
  const userEmail = currentUser?.email || "protected@fraudlens.ai";

  const memberSince = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Nov 2025";

  // Real Backend History States
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State for interactive audit log inspection
  const [selectedScanItem, setSelectedScanItem] = useState(null);

  // Fetch real scan history using shared api service
  useEffect(() => {
    const loadDashboardHistory = async () => {
      try {
        setLoading(true);
        const response = await fetchScanHistory();
        const logs = response.message || response.data || [];
        setHistoryList(Array.isArray(logs) ? logs : []);
      } catch (error) {
        console.error("Failed to fetch dashboard history:", error);
        setHistoryList([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardHistory();
  }, []);

  // --- CALCULATE METRICS FROM REAL BACKEND HISTORY ---
  const totalScansLifetime = historyList.length;

  const todayStr = new Date().toDateString();
  const scansToday = historyList.filter((item) => {
    const itemDate = item.createdAt || item.timestamp;
    return itemDate && new Date(itemDate).toDateString() === todayStr;
  }).length;

  const threatsBlocked = historyList.filter((item) => {
    const score = item.result?.riskScore ?? item.risk ?? 0;
    const status = (
      item.result?.overallStatus ||
      item.result?.status ||
      ""
    ).toLowerCase();
    return (
      score > 40 ||
      status.includes("high") ||
      status.includes("blocked") ||
      status.includes("phishing")
    );
  }).length;

  const highRiskAlerts = historyList.filter((item) => {
    const score = item.result?.riskScore ?? item.risk ?? 0;
    return score > 70;
  }).length;

  const avgRiskScore =
    historyList.length > 0
      ? historyList.reduce(
          (acc, curr) => acc + (curr.result?.riskScore ?? curr.risk ?? 0),
          0,
        ) / historyList.length
      : 0;

  const currentThreatLevel =
    avgRiskScore > 60
      ? "High Risk"
      : avgRiskScore > 30
        ? "Medium Risk"
        : "Low Risk";
        
  const threatBadgeColor =
    avgRiskScore > 60
      ? "text-red-600 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900"
      : avgRiskScore > 30
        ? "text-amber-600 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900"
        : "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900";

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-12 animate-in fade-in duration-300">
      
      {/* 1. HERO BANNER WITH INTERACTIVE GLOW */}
      <div className="relative overflow-hidden bg-white dark:bg-gradient-to-r dark:from-indigo-950 dark:via-slate-900 dark:to-blue-950 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-indigo-500/20 transition-all">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-ping"></span>
              Secure Workspace Active
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight capitalize">
              Welcome Back, {userName}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl font-medium">
              Your security agents are actively monitoring URLs, messages, and
              screenshots for zero-day phishing vectors. All systems secure.
            </p>
          </div>

          {/* System Health Score Badge */}
          <div className="bg-slate-50 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-2xl flex items-center gap-4 min-w-[220px] shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border-2 border-emerald-500 dark:border-emerald-400 flex items-center justify-center font-black text-xl text-emerald-600 dark:text-emerald-400 shadow-inner">
              A+
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-semibold uppercase tracking-wider">
                System Health
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                98
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                  /100 Optimal
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Stat Pills Inside Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
          <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Scans Today
            </p>
            <p className="text-2xl font-black text-indigo-600 dark:text-cyan-400 mt-0.5">
              {scansToday}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Threats Blocked
            </p>
            <p className="text-2xl font-black text-red-600 dark:text-red-400 mt-0.5">
              {threatsBlocked}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              High Risk Alerts
            </p>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
              {highRiskAlerts}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              AI Model Status
            </p>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              v1.0 Gemini Online
            </p>
          </div>
        </div>
      </div>

      {/* 2. QUICK ACTIONS & USER CONTEXT ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-4 flex items-center gap-2">
            <Activity size={18} className="text-indigo-600 dark:text-indigo-400" />
            Quick Security Scanners
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <RouterLink
              to="/app/dashboard/url"
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 text-cyan-700 dark:text-cyan-300 hover:scale-[1.03] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="p-3.5 rounded-2xl bg-cyan-100 dark:bg-cyan-900/50 mb-3 group-hover:bg-cyan-200 transition-colors shadow-inner">
                <LinkIcon size={22} />
              </div>
              <span className="text-xs font-black">Scan URL</span>
            </RouterLink>

            <RouterLink
              to="/app/dashboard/message"
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 hover:scale-[1.03] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="p-3.5 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 mb-3 group-hover:bg-indigo-200 transition-colors shadow-inner">
                <MessageSquare size={22} />
              </div>
              <span className="text-xs font-black">Paste Message</span>
            </RouterLink>

            <RouterLink
              to="/app/dashboard/image"
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:scale-[1.03] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 mb-3 group-hover:bg-emerald-200 transition-colors shadow-inner">
                <Upload size={22} />
              </div>
              <span className="text-xs font-black">Scan Screenshot</span>
            </RouterLink>

            <RouterLink
              to="/app/dashboard/qr"
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 text-purple-700 dark:text-purple-300 hover:scale-[1.03] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="p-3.5 rounded-2xl bg-purple-100 dark:bg-purple-900/50 mb-3 group-hover:bg-purple-200 transition-colors shadow-inner">
                <QrCode size={22} />
              </div>
              <span className="text-xs font-black">Scan QR Code</span>
            </RouterLink>
          </div>
        </div>

        {/* User Account Context Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-3 flex items-center gap-2">
              <UserCheck size={16} className="text-indigo-500" /> Account Context
            </h3>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <p className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium">User:</span>
                <strong className="text-slate-900 dark:text-slate-200 capitalize truncate max-w-[130px]">
                  {userName}
                </strong>
              </p>
              <p className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium">Email:</span>
                <strong className="text-slate-700 dark:text-slate-300 truncate max-w-[130px]">
                  {userEmail}
                </strong>
              </p>
              <p className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium">Member Since:</span>
                <strong className="text-indigo-600 dark:text-indigo-400">
                  {memberSince}
                </strong>
              </p>
              <p className="flex justify-between py-1">
                <span className="font-medium">Auth:</span>
                <strong className="text-emerald-600">✓ Verified</strong>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
            <Lock size={12} className="text-emerald-500" /> Secure Session Active
          </div>
        </div>
      </div>

      {/* 3. SUB STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex justify-between items-center shadow-sm">
          <div>
            <p className="text-xs text-slate-500 font-medium mb-1">Total Scans</p>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {totalScansLifetime}
            </p>
          </div>
          <div className="text-[10px] font-black uppercase px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 border border-indigo-200 dark:border-indigo-900">
            LIVE
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex justify-between items-center shadow-sm">
          <div>
            <p className="text-xs text-slate-500 font-medium mb-1">Neutralized</p>
            <p className="text-2xl font-black text-red-600 dark:text-red-400">
              {threatsBlocked}
            </p>
          </div>
          <div className="text-[10px] font-black uppercase px-2.5 py-1 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 border border-red-200 dark:border-red-900">
            LIVE
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex justify-between items-center shadow-sm">
          <div>
            <p className="text-xs text-slate-500 font-medium mb-1">Safe Links</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {Math.max(0, totalScansLifetime - threatsBlocked)}
            </p>
          </div>
          <div className="text-[10px] font-black uppercase px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-900">
            LIVE
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex justify-between items-center shadow-sm">
          <div>
            <p className="text-xs text-slate-500 font-medium mb-1">Threat Level</p>
            <p className="text-xl font-black text-slate-800 dark:text-slate-100">
              {currentThreatLevel}
            </p>
          </div>
          <div className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-xl ${threatBadgeColor}`}>
            LIVE
          </div>
        </div>
      </div>

      {/* 4. RECENT AUDIT LOGS & TREND CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Audit Logs Table (Now Clickable to open full modal report) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm lg:col-span-2 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">
                  Recent Audit Logs
                </h3>
                <p className="text-xs text-slate-400">Click any row to inspect complete scan report</p>
              </div>
              <RouterLink
                to="/app/dashboard/history"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                View All History <ArrowRight size={14} />
              </RouterLink>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800 text-xs uppercase font-bold">
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Target Input</th>
                    <th className="pb-3">Risk Score</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-400">
                        Loading audit logs from backend...
                      </td>
                    </tr>
                  ) : historyList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-400">
                        No scan records found. Run a scan to populate history!
                      </td>
                    </tr>
                  ) : (
                    historyList.slice(0, 4).map((row, i) => {
                      const score = row.result?.riskScore ?? row.risk ?? 0;
                      const status =
                        row.result?.overallStatus ||
                        row.result?.status ||
                        (score > 40 ? "High Risk" : "Safe");
                      const isSafe = status.toLowerCase().includes("safe");
                      const statusColor = isSafe
                        ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30"
                        : "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30";

                      return (
                        <tr
                          key={row._id || row.id || i}
                          onClick={() => setSelectedScanItem(row)}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                          title="Click to view full inspection report"
                        >
                          <td className="py-3.5 font-bold uppercase group-hover:text-indigo-600 transition-colors">
                            {row.scanType || "Scan"}
                          </td>
                          <td className="py-3.5 font-mono text-slate-500 truncate max-w-[200px]">
                            {row.input || row.target || "N/A"}
                          </td>
                          <td className="py-3.5 font-black">
                            <span className={score > 40 ? "text-red-500" : "text-emerald-500"}>
                              {score}/100
                            </span>
                          </td>
                          <td className="py-3.5 text-slate-400 flex items-center gap-1 pt-4">
                            <Clock size={12} />
                            {row.createdAt || row.timestamp
                              ? new Date(
                                  row.createdAt || row.timestamp,
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Just now"}
                          </td>
                          <td className="py-3.5 text-right">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${statusColor}`}>
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Threat Detection Trend Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-black text-slate-900 dark:text-slate-100 text-sm">
                Threat Detection Trend
              </h3>
              <TrendingUp size={16} className="text-cyan-500" />
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Monthly comparison of blocked threats
            </p>

            <div className="h-[210px] w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient
                      id="colorThreats"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="threats"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorThreats)"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <span>AI Threat Index</span>
            <span className="font-bold text-cyan-500">+14% vs last month</span>
          </div>
        </div>
      </div>

      {/* DETAILED SCAN REPORT MODAL (When clicking any recent log row) */}
      <ScanReportModal
        selectedItem={selectedScanItem}
        onClose={() => setSelectedScanItem(null)}
      />
    </div>
  );
}