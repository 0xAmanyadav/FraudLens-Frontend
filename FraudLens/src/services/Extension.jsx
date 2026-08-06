import React from "react";
import {
  Puzzle,
  Sparkles,
  Download,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Extension() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center min-h-[75vh] text-center relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl -top-10 -z-10 pointer-events-none"></div>
      <div className="absolute w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl -bottom-10 -z-10 pointer-events-none"></div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-6 shadow-sm">
        <Sparkles size={14} className="animate-spin" /> Coming Soon
      </div>

      {/* Hero Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/30 mx-auto transform hover:scale-105 transition-transform duration-300">
          <Puzzle size={44} />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white dark:border-slate-900">
          <ShieldCheck size={16} />
        </div>
      </div>

      {/* Title & Description */}
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
        FraudLens Browser Extension
      </h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-xl text-base sm:text-lg leading-relaxed mb-8">
        We are building a powerful browser extension that automatically detects
        phishing links, fake QR codes, and malicious scripts in real-time as you
        browse the web.
      </p>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-10 text-left">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
          <div className="p-2.5 w-fit rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <Zap size={20} />
          </div>
          <h3 className="font-bold text-sm">Real-time Warning</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Instant alerts before visiting dangerous phishing websites.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
          <div className="p-2.5 w-fit rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-sm">One-Click Scan</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Scan active webpage content directly from your toolbar.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
          <div className="p-2.5 w-fit rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-sm">AI Powered</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Advanced AI checks every link and script securely.
          </p>
        </div>
      </div>

      {/* Notify Action Box */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
        <input
          type="email"
          placeholder="Enter your email for early access"
          className="px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-indigo-500 flex-1 shadow-sm"
        />
        <button
          onClick={() => alert("You're on the early access list!")}
          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/20 cursor-pointer flex items-center justify-center gap-2"
        >
          Notify Me <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
