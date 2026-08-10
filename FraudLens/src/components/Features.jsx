import React from "react";
import {
  Shield,
  Globe,
  MessageSquare,
  ScanSearch,
  Radar,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Scam Detection",
    desc: "Detect phishing messages, fake job offers, OTP scams and social engineering attacks instantly.",
    icon: Shield,
    badge: "Gemini AI",
    status: "Active",
  },
  {
    title: "URL Intelligence",
    desc: "Analyze suspicious websites using AI and real-time threat intelligence.",
    icon: Globe,
    badge: "Real-time",
    status: "Active",
  },
  {
    title: "Message Scanner",
    desc: "Scan SMS, Emails and WhatsApp messages for fraud indicators.",
    icon: MessageSquare,
    badge: "NLP Powered",
    status: "Active",
  },
  {
    title: "Screenshot Scanner",
    desc: "Upload screenshots and let AI detect hidden scams and fake messages.",
    icon: ScanSearch,
    badge: "OCR Engine",
    status: "Active",
  },
  {
    title: "Live Threat Feed",
    desc: "Stay updated with phishing campaigns and malicious domains worldwide.",
    icon: Radar,
    badge: "Coming Soon",
    status: "Soon",
  },
  {
    title: "Security Analytics",
    desc: "Visualize threats, scans and risk trends through interactive dashboards.",
    icon: BarChart3,
    badge: "Coming Soon",
    status: "Soon",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28 px-6 bg-slate-50 dark:bg-[#070b14] transition-colors duration-500 overflow-hidden"
    >
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-400/5 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/5 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/20 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Core Capabilities
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered for Absolute Protection
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
            Practical, AI-driven capabilities that help detect and prevent fraud across web, messages and screenshots — fast and at scale.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            const isSoon = item.status === "Soon";

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group relative flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-[#101932]/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-950/5 hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 ${
                  isSoon ? "opacity-90" : ""
                }`}
              >
                {/* Top Row: Icon & Badge */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} />
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isSoon
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3
                    id={`feature-${index}`}
                    className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors"
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Row: Trust Footer & Link / Coming Soon text */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                    {isSoon ? "In Development" : "Trusted · Real-time"}
                  </span>
                  {!isSoon ? (
                    <a
                      href="#scanner"
                      className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-cyan-400 hover:gap-2 transition-all duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("scanner")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span>Explore</span>
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 italic">
                      Coming Soon
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}