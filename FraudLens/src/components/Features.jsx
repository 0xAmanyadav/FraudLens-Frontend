import React from "react";
import {
  Shield,
  Globe,
  MessageSquare,
  ScanSearch,
  Bot,
  Radar,
  Puzzle,
  BarChart3,
  Users,
} from "lucide-react";

const features = [
  {
    title: "AI Scam Detection",
    desc: "Detect phishing messages, fake job offers, OTP scams and social engineering attacks instantly.",
    icon: Shield,
  },
  {
    title: "URL Intelligence",
    desc: "Analyze suspicious websites using AI and real-time threat intelligence.",
    icon: Globe,
  },
  {
    title: "Message Scanner",
    desc: "Scan SMS, Emails and WhatsApp messages for fraud indicators.",
    icon: MessageSquare,
  },
  {
    title: "Screenshot Scanner",
    desc: "Upload screenshots and let AI detect hidden scams and fake messages.",
    icon: ScanSearch,
  },
  {
    title: "Live Threat Feed",
    desc: "Stay updated with phishing campaigns and malicious domains worldwide.",
    icon: Radar,
  },
  
  {
    title: "Security Analytics",
    desc: "Visualize threats, scans and risk trends through interactive dashboards.",
    icon: BarChart3,
  },
  
];

export default function Features() {
  return (
    <section
      id="Features"
      className="
      py-24
      bg-slate-50
      dark:bg-slate-950
      transition-colors
      duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Core Features
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Practical, AI-driven capabilities that help detect and prevent fraud
            across web, messages and screenshots — fast and at scale.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={index}
                className="group relative flex flex-col gap-25 items-center p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transform-gpu hover:-translate-y-1 transition-all duration-300"
                aria-labelledby={`feature-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3
                      id={`feature-${index}`}
                      className="text-lg font-semibold text-slate-900 dark:text-white"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Trusted · Real-time
                  </span>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                    onClick={(e) => e.preventDefault()}
                  >
                    Learn more →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
