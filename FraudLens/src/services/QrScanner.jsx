import React, { useState } from "react";
import {
  QrCode,
  Upload,
  ArrowRight,
  Activity,
  ShieldCheck,
  XCircle,
  CheckCircle,
} from "lucide-react";

export default function QrScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      setResult(null);

      // Simulated AI QR Analysis
      setTimeout(() => {
        const isMalicious = Math.random() > 0.7; // Random result for demo
        setResult({
          status: isMalicious ? "MALICIOUS" : "SAFE",
          decodedUrl: "https://secure-official-link.com",
          riskScore: isMalicious ? 92 : 8,
          analysis: isMalicious
            ? "WARNING: This QR code redirects to a known phishing domain."
            : "SUCCESS: This QR code leads to a verified and safe destination.",
        });
        setIsScanning(false);
      }, 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-10">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <QrCode className="text-cyan-600 dark:text-cyan-400" size={32} />
          QR Code Scanner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm max-w-lg">
          Upload a QR code image to inspect its destination before scanning.
          Prevent malicious redirects and hidden payload execution.
        </p>
      </div>

      {/* SCANNER AREA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center shadow-sm">
        <label className="w-full h-64 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 dark:hover:border-cyan-500 transition-all group bg-slate-50 dark:bg-slate-950/50">
          <Upload
            size={40}
            className="text-slate-400 mb-4 group-hover:text-cyan-500"
          />
          <span className="font-bold text-slate-600 dark:text-slate-300">
            Click to upload QR Code
          </span>
          <span className="text-xs text-slate-400 mt-1">
            PNG, JPG or JPEG allowed
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*"
          />
        </label>

        {isScanning && (
          <div className="mt-8 flex items-center gap-3 text-cyan-600 dark:text-cyan-400 font-bold">
            <Activity className="animate-spin" /> Analyzing QR Data...
          </div>
        )}
      </div>

      {/* RESULT SECTION */}
      {result && !isScanning && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div
            className={`p-6 rounded-3xl border ${result.status === "MALICIOUS" ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/30" : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/30"}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-full ${result.status === "MALICIOUS" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}
              >
                {result.status === "MALICIOUS" ? (
                  <XCircle size={32} />
                ) : (
                  <CheckCircle size={32} />
                )}
              </div>
              <div>
                <h2 className="text-xl font-black">
                  {result.status === "MALICIOUS"
                    ? "Malicious QR Detected"
                    : "Safe QR Verified"}
                </h2>
                <p className="text-xs font-mono opacity-80 mt-1 break-all">
                  {result.decodedUrl}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between bg-black/5 dark:bg-black/20 p-4 rounded-xl">
              <p className="text-sm font-medium">{result.analysis}</p>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold opacity-60">
                  Risk
                </p>
                <p className="text-xl font-black">{result.riskScore}/100</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
