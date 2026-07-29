import React, { useState } from "react";
import { 
  Search, Shield, AlertTriangle, CheckCircle, 
  Globe, Lock, Clock, Server, ArrowRight, ShieldAlert, XCircle, Activity
} from "lucide-react";

export default function UrlScanner() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setIsScanning(true);
    setResult(null); 

    setTimeout(() => {
      const isMalicious = url.toLowerCase().includes("scam") || url.toLowerCase().includes("login") || url.toLowerCase().includes("free");
      
      const mockApiResponse = {
        targetUrl: url,
        riskScore: isMalicious ? 94 : 12,
        status: isMalicious ? "MALICIOUS" : "SAFE",
        threatCategory: isMalicious ? "Phishing / Credential Harvesting" : "No Threats Found",
        metrics: {
          ssl: isMalicious ? "Invalid or Self-Signed" : "Valid (TLS 1.3)",
          domainAge: isMalicious ? "2 Days (Highly Suspicious)" : "5 Years, 2 Months",
          serverLocation: isMalicious ? "Russia (High Risk ASN)" : "United States (AWS)",
          blacklisted: isMalicious ? "Detected by 4 security engines" : "Clean across 90+ engines"
        }
      };

      setResult(mockApiResponse);
      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* HEADER */}
      <div className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-3">
          <Globe className="text-blue-600 dark:text-blue-500" size={32} />
          Advanced URL Scanner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed max-w-2xl">
          Enter a suspicious link below. Our autonomous AI agents will inspect the domain's reputation, SSL certificates, redirects, and hidden payloads in real-time.
        </p>
      </div>

      {/* INPUT FORM */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm transition-colors duration-300">
        <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400 dark:text-slate-500" size={20} />
            </div>
            <input
              type="url"
              required
              placeholder="e.g., https://suspicious-website.com/login"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isScanning}
              className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isScanning || !url}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
          >
            {isScanning ? (
              <>
                <Activity className="animate-spin" size={18} />
                Scanning...
              </>
            ) : (
              <>
                Analyze Link
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-4 flex items-center justify-center md:justify-start gap-1.5">
          <ShieldAlert size={14} className="text-slate-400 dark:text-slate-500" />
          Pro Tip: Try scanning a URL with the word "login" or "scam" to see the Threat UI.
        </p>
      </div>

      {/* LOADING ANIMATION */}
      {isScanning && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center shadow-sm animate-pulse transition-colors duration-300">
          <div className="w-16 h-16 rounded-full border-4 border-blue-100 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-500 animate-spin mb-6"></div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI is investigating the URL...</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-sm">
            Checking global threat intelligence feeds, resolving DNS, and analyzing page content for malicious footprints.
          </p>
        </div>
      )}

      {/* API RESULT DASHBOARD */}
      {result && !isScanning && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Main Result Banner */}
          <div className={`p-6 md:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300 ${
            result.status === "MALICIOUS" 
              ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/30" 
              : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/30"
          }`}>
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                result.status === "MALICIOUS" 
                  ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400" 
                  : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              }`}>
                {result.status === "MALICIOUS" ? <XCircle size={32} /> : <CheckCircle size={32} />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className={`text-2xl font-black ${
                    result.status === "MALICIOUS" ? "text-red-700 dark:text-red-400" : "text-emerald-700 dark:text-emerald-400"
                  }`}>
                    {result.status === "MALICIOUS" ? "High Risk Detected!" : "URL Looks Safe"}
                  </h2>
                </div>
                <p className={`text-sm font-medium ${
                  result.status === "MALICIOUS" ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-500"
                }`}>
                  Threat Category: {result.threatCategory}
                </p>
              </div>
            </div>

            {/* Risk Score Gauge Indicator */}
            <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl border border-white/50 dark:border-slate-700 shadow-sm flex items-center gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Risk Score</p>
                <p className={`text-3xl font-black ${
                  result.status === "MALICIOUS" ? "text-red-600 dark:text-red-400" : "text-emerald-500 dark:text-emerald-400"
                }`}>
                  {result.riskScore}<span className="text-sm text-slate-400 dark:text-slate-500">/100</span>
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* SSL Info */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4 border border-slate-100 dark:border-slate-700">
                <Lock size={20} />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">SSL Certificate</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{result.metrics.ssl}</p>
            </div>

            {/* Domain Age */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4 border border-slate-100 dark:border-slate-700">
                <Clock size={20} />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Domain Age</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{result.metrics.domainAge}</p>
            </div>

            {/* Server Location */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4 border border-slate-100 dark:border-slate-700">
                <Server size={20} />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Server Location</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{result.metrics.serverLocation}</p>
            </div>

            {/* Blacklist Status */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4 border border-slate-100 dark:border-slate-700">
                <AlertTriangle size={20} />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Blacklist Status</p>
              <p className={`text-sm font-semibold ${
                result.status === "MALICIOUS" ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white"
              }`}>
                {result.metrics.blacklisted}
              </p>
            </div>

          </div>

          {/* Target Info Bar */}
          <div className="bg-slate-900 dark:bg-slate-950 border border-transparent dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3 overflow-hidden transition-colors duration-300">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest shrink-0">Target URL:</span>
            <span className="text-sm font-mono text-emerald-400 truncate w-full">{result.targetUrl}</span>
          </div>

        </div>
      )}

    </div>
  );
}