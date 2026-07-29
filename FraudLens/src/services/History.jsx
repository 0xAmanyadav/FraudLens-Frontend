import React from "react";
import { History, Link as LinkIcon, MessageSquare, QrCode, ShieldAlert, ShieldCheck } from "lucide-react";

export default function History() {
  // Mock History Data (Real app mein ye API se aayega)
  const historyData = [
    { id: 1, tool: "URL Scanner", target: "bit.ly/secure-link", risk: 12, status: "Safe", date: "Jul 16, 2026, 09:30 PM", icon: LinkIcon },
    { id: 2, tool: "Message Scanner", target: "Bank Offer SMS", risk: 88, status: "Malicious", date: "Jul 16, 2026, 08:45 PM", icon: MessageSquare },
    { id: 3, tool: "QR Code Scanner", target: "Restaurant Menu", risk: 5, status: "Safe", date: "Jul 15, 2026, 02:15 PM", icon: QrCode },
    { id: 4, tool: "URL Scanner", target: "free-gift.com", risk: 94, status: "Malicious", date: "Jul 14, 2026, 11:20 AM", icon: LinkIcon },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <History className="text-blue-600 dark:text-blue-400" size={32} />
            Scan History
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Review your previous security scans and threat detections.
          </p>
        </div>
        <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
          Export Report
        </button>
      </div>

      {/* HISTORY TABLE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tool</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Target</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Risk Score</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {historyData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3 font-semibold">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      <item.icon size={16} />
                    </div>
                    {item.tool}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono truncate max-w-[200px]">{item.target}</td>
                  <td className="px-6 py-4 font-bold">{item.risk}/100</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.status === "Safe" 
                        ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" 
                        : "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                    }`}>
                      {item.status === "Safe" ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}