import React from "react";
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Globe,
  ImageIcon,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Clock,
  FileCode,
  ListOrdered,
  Lightbulb,
} from "lucide-react";

export default function ScanReportModal({ selectedItem, onClose }) {
  if (!selectedItem) return null;

  const { scanType, input, image, result, createdAt } = selectedItem;
  const riskScore = result?.riskScore ?? 0;
  const isCriticalOrHigh = riskScore > 40;
  const isSafe = !isCriticalOrHigh;

  // Choose icon based on scan type
  const getHeaderIcon = () => {
    switch (scanType?.toLowerCase()) {
      case "url":
        return <Globe className="text-blue-500" size={24} />;
      case "image":
      case "screenshot":
        return <ImageIcon className="text-purple-500" size={24} />;
      case "text":
      case "message":
        return <MessageSquare className="text-amber-500" size={24} />;
      default:
        return <ShieldCheck className="text-cyan-500" size={24} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-slate-900 dark:text-slate-100">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
              {getHeaderIcon()}
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-500">
                Security Audit Report ({scanType?.toUpperCase()})
              </span>
              <h2 className="text-xl font-black capitalize">
                {result?.overallStatus || (isSafe ? "Safe Analysis" : "Threat Detected")}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* OVERVIEW METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Risk Score</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className={`text-2xl font-black ${riskScore > 40 ? "text-red-500" : "text-emerald-500"}`}>
                {riskScore}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/100</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Confidence</span>
            <span className="text-2xl font-black mt-2 text-indigo-600 dark:text-indigo-400">
              {result?.confidence ?? 100}%
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Timestamp</span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 mt-2">
              <Clock size={14} className="shrink-0" />
              <span>{new Date(createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* THREAT TYPE BADGES (If any) */}
        {result?.threatType && result.threatType.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Identified Threat Vectors</p>
            <div className="flex flex-wrap gap-2">
              {result.threatType.map((threat, idx) => (
                <span key={idx} className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-black rounded-xl">
                  {threat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* INPUT / TARGET SECTION */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            {scanType === "url" ? "Target URL" : scanType === "image" ? "Extracted Content / Description" : "Scanned Payload"}
          </p>
          <div className="font-mono bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs break-all text-slate-700 dark:text-slate-300 flex items-center justify-between gap-3">
            <span className="line-clamp-3">{input}</span>
            {scanType === "url" && (
              <a href={input} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600 shrink-0">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* SCANNED IMAGE PREVIEW (If applicable) */}
        {image?.url && (
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Uploaded Specimen Image</p>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-56 bg-slate-950 flex justify-center">
              <img src={image.url} alt="Scan Target" className="object-contain h-56 w-full" />
            </div>
          </div>
        )}

        {/* AI SUMMARY */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Cpu size={14} className="text-indigo-500" /> AI Executive Summary
          </p>
          <p className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
            {result?.summary || "No summary available."}
          </p>
        </div>

        {/* AI PLAIN ENGLISH EXPLANATION */}
        {result?.aiExplanation && (
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb size={14} /> Plain English Explanation
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
              {result.aiExplanation}
            </p>
          </div>
        )}

        {/* REASONS / BREAKDOWN LIST */}
        {result?.reasons && result.reasons.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ListOrdered size={14} /> Detailed Risk Indicators
            </p>
            <div className="space-y-2.5">
              {result.reasons.map((reason, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {reason.title}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-3.5">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {result?.recommendations && result.recommendations.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" /> Security Recommendations
            </p>
            <ul className="space-y-1.5 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-2xl">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

       
        {/* FOOTER CLOSE BUTTON */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold text-sm cursor-pointer shadow-lg hover:opacity-95 transition-opacity"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
}