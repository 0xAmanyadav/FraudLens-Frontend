import React, { useState } from "react";
import { MessageSquare, ShieldAlert, AlertTriangle, CheckCircle, XCircle, Activity, ArrowRight, Shield } from "lucide-react";

export default function MessageScanner() {
  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!message) return;
    
    setIsScanning(true);
    setResult(null);

    // Simulated AI Analysis
    setTimeout(() => {
      const isScam = message.toLowerCase().includes("win") || message.toLowerCase().includes("prize") || message.toLowerCase().includes("bank");
      
      const mockResult = {
        status: isScam ? "MALICIOUS" : "SAFE",
        riskScore: isScam ? 88 : 5,
        threatType: isScam ? "Social Engineering / Financial Scam" : "Clean",
        analysis: isScam 
          ? "This message uses urgent language and promises of financial rewards typical of phishing attempts."
          : "The message content appears to be normal communication without any malicious patterns."
      };

      setResult(mockResult);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <MessageSquare className="text-indigo-600 dark:text-indigo-400" size={32} />
          Message Scanner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm max-w-lg">
          Paste your text, SMS, or email content. Our AI will flag phishing attempts, scams, and dangerous social engineering tactics.
        </p>
      </div>

      {/* SCANNER BOX */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <form onSubmit={handleScan} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste your message here..."
            className="w-full h-40 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm resize-none"
          />
          <button
            type="submit"
            disabled={isScanning || !message}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-indigo-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isScanning ? (
              <><Activity className="animate-spin" size={18} /> Analyzing...</>
            ) : (
              <>Scan Message <ArrowRight size={18} /></>
            )}
          </button>
        </form>
      </div>

      {/* RESULT SECTION */}
      {result && !isScanning && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className={`p-6 rounded-3xl border ${result.status === "MALICIOUS" ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/30" : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/30"}`}>
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-full ${result.status === "MALICIOUS" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
                {result.status === "MALICIOUS" ? <XCircle size={32} /> : <CheckCircle size={32} />}
              </div>
              <div>
                <h2 className="text-xl font-black">{result.status === "MALICIOUS" ? "Potential Threat Found" : "Message Seems Safe"}</h2>
                <p className="text-sm opacity-80">{result.threatType}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">Risk Score</p>
                <p className="text-3xl font-black">{result.riskScore}/100</p>
              </div>
            </div>
            <p className="mt-4 text-sm bg-black/5 dark:bg-black/20 p-4 rounded-xl">{result.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
}