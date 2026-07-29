import React from "react";
import { Link as LinkIcon, MessageSquare, Upload, AlertTriangle } from "lucide-react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA ---
const trendData = [
  { name: 'Jan', threats: 40 }, { name: 'Feb', threats: 30 },
  { name: 'Mar', threats: 70 }, { name: 'Apr', threats: 45 },
  { name: 'May', threats: 90 }, { name: 'Jun', threats: 65 },
  { name: 'Jul', threats: 110 }
];

export default function DashboardHome() {
  return (
    // 🛠️ FIX 1: Added pb-8 (padding-bottom) to prevent layout shifting at the very bottom
    <div className="max-w-7xl mx-auto space-y-6 text-slate-900 pb-8">
      
      {/* Top Banner Row */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 mb-4">Protected by Autonomous AI Agents</h1>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Total Scans Today</p>
                <p className="text-4xl font-bold text-cyan-500">1,245</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Threats Blocked</p>
                <p className="text-4xl font-bold text-red-500">88</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">High Risk Alerts</p>
                <p className="text-4xl font-bold text-indigo-500">12</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-4 min-w-[200px]">
            <div className="w-14 h-14 rounded-full border-4 border-slate-900 flex items-center justify-center font-bold text-xl">A+</div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Security Score</p>
              <p className="text-2xl font-bold text-emerald-600">94<span className="text-sm text-slate-400">/100</span></p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="w-full xl:w-72 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center p-3 bg-cyan-50 border border-cyan-200 text-cyan-700 rounded-xl hover:bg-cyan-100 transition-colors">
              <LinkIcon size={18} className="mb-1" />
              <span className="text-xs font-bold">Scan URL</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors">
              <MessageSquare size={18} className="mb-1" />
              <span className="text-xs font-bold">Paste Msg</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors">
              <Upload size={18} className="mb-1" />
              <span className="text-xs font-bold">Upload Pic</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl hover:bg-red-100 transition-colors">
              <AlertTriangle size={18} className="mb-1" />
              <span className="text-xs font-bold">Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Scans", value: "15K+", color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Scam Detected", value: "342", color: "text-red-600", bg: "bg-red-50" },
          { label: "Safe Links", value: "14.6K+", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Risk Level", value: "Low", color: "text-emerald-600", bg: "bg-emerald-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-4 rounded-2xl flex justify-between items-center shadow-sm">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`text-[10px] font-bold px-2 py-1 rounded-md ${stat.bg} ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Data Feed / Table etc */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Scans Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-x-auto">
            <h3 className="font-bold text-slate-900 mb-4">Recent Scans</h3>
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Threat</th>
                  <th className="pb-3 font-medium">Risk Score</th>
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  { type: "URL", threat: "Phishing", score: "92", status: "Safe", color: "bg-emerald-100 text-emerald-700" },
                  { type: "Scam", threat: "Phishing", score: "92", status: "BLOCKED", color: "bg-red-100 text-red-700" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 font-medium">{row.type}</td>
                    <td className="py-3">{row.threat}</td>
                    <td className="py-3">{row.score}</td>
                    <td className="py-3 text-slate-500">2m ago</td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${row.color}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Charts */}
        <div className="space-y-6">
           <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Threat Detection Trend</h3>
            <p className="text-xs text-slate-500 mb-4">Past 6 months activity</p>
            {/* 🛠️ FIX 2: Replaced plain h-40 with a strictly locked wrapper (h-[200px] w-full min-h-0) to stop Recharts from expanding */}
            <div className="h-[200px] w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line type="monotone" dataKey="threats" stroke="#06b6d4" strokeWidth={3} dot={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}