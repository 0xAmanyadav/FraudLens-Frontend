import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Link as LinkIcon,
  MessageSquare,
  Image as ImageIcon,
  QrCode,
  Puzzle,
  Bot,
  ShieldAlert,
  ArrowRight,
  Clock,
} from "lucide-react";

export default function ScanCenter() {
  const { username } = useParams();

  const scanTools = [
    {
      title: "URL Scanner",
      desc: "Analyze links for phishing, malware, and malicious redirects instantly.",
      icon: LinkIcon,
      path: "/app/dashboard/url",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "group-hover:border-blue-400 dark:group-hover:border-blue-500/50",
      accent: "bg-blue-500",
      isComingSoon: false,
    },
    {
      title: "Message Scanner",
      desc: "Detect social engineering and scam patterns in SMS, WhatsApp or emails.",
      icon: MessageSquare,
      path: "/app/dashboard/message",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      border:
        "group-hover:border-indigo-400 dark:group-hover:border-indigo-500/50",
      accent: "bg-indigo-500",
      isComingSoon: false,
    },
    {
      title: "Screenshot Scanner",
      desc: "Upload images of suspicious messages or profiles for AI OCR analysis.",
      icon: ImageIcon,
      path: "/app/dashboard/image",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border:
        "group-hover:border-emerald-400 dark:group-hover:border-emerald-500/50",
      accent: "bg-emerald-500",
      isComingSoon: false,
    },
    {
      title: "QR Code Scanner",
      desc: "Check QR codes for hidden malicious URLs before you scan them.",
      icon: QrCode,
      path: "/app/dashboard/qr",
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
      border: "group-hover:border-cyan-400 dark:group-hover:border-cyan-500/50",
      accent: "bg-cyan-500",
      isComingSoon: false,
    },
    {
      title: "Browser Extension",
      desc: "Get real-time protection while browsing the web.",
      icon: Puzzle,
      path: "#",
      color: "text-slate-900 dark:text-slate-100",
      bg: "bg-slate-100 dark:bg-slate-800",
      border: "group-hover:border-slate-400 dark:group-hover:border-slate-600",
      accent: "bg-slate-900 dark:bg-white",
      isComingSoon: true,
    },
    {
      title: "AI Security Copilot",
      desc: "Chat with your autonomous AI agent to investigate complex threats.",
      icon: Bot,
      path: "#",
      color: "text-slate-900 dark:text-slate-100",
      bg: "bg-slate-100 dark:bg-slate-800",
      border: "group-hover:border-slate-400 dark:group-hover:border-slate-600",
      accent: "bg-slate-900 dark:bg-white",
      isComingSoon: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-10">
      {/* Header Section (Centered) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-sm transition-colors duration-300 text-center flex flex-col items-center">
        <div className="relative z-10 max-w-2xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-wide uppercase mb-4">
            <ShieldAlert size={14} />
            Command Center
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            AI Scan Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Select a scanner module below to analyze potential threats. Our
            autonomous AI agents cross-reference data with global threat
            intelligence feeds in real-time.
          </p>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Grid Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {scanTools.map((tool, index) => {
          const CardWrapper = tool.isComingSoon ? "div" : Link;

          return (
            <CardWrapper
              key={index}
              {...(!tool.isComingSoon ? { to: tool.path } : {})}
              className={`group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden ${tool.border} ${
                tool.isComingSoon ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {/* Top Hover Accent Bar */}
              <div
                className={`absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tool.accent}`}
              ></div>

              <div className="flex items-start justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                    !tool.isComingSoon ? "group-hover:scale-110" : ""
                  } ${tool.bg} ${tool.color}`}
                >
                  <tool.icon size={24} />
                </div>

                {tool.isComingSoon ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                    <Clock size={12} />
                    Coming Soon
                  </span>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-colors duration-300">
                    <ArrowRight
                      size={16}
                      className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </CardWrapper>
          );
        })}
      </div>
    </div>
  );
}
