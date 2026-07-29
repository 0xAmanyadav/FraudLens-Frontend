import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link को इंपोर्ट किया
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import logo from "../assets/company_logo/logo.png";
import {
  Shield,
  Target,
  Eye,
  Users,
  Brain,
  Globe,
  ArrowRight,
  Moon, // Moon आइकॉन जोड़ा
  Sun, // Sun आइकॉन जोड़ा hai
} from "lucide-react";

export default function About() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const team = [
    {
      name: "Aman Yadav",
      role: "Frontend Developer & Team Lead",
    },
    {
      name: "Prakhar Gupta",
      role: "Backend Developer",
    },
    {
      name: "Adarsh Gupta",
      role: "Research & Documentation",
    },
    {
      name: "Aditya Singh",
      role: "UI / UX Designer",
    },
    {
      name: "Vinayak Chauhan",
      role: "Presentation & Pitch",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-all ${mounted && isDark ? "dark bg-slate-950" : "bg-white"}`}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-xl bg-white/80 dark:bg-[#0B1120]/80 border-b border-slate-200 dark:border-slate-800/80 z-50 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO: use asset and link to home */}
          <Link to="/" className="cursor-pointer">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <img
                src={logo}
                alt="FraudLens"
                className="h-10 w-auto rounded-md"
              />
              <span className="sr-only">Home</span>
            </motion.div>
          </Link>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="relative w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-700 transition-all duration-300"
            >
              <motion.div
                animate={{
                  x: isDark ? 24 : 2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                className="absolute top-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-lg"
              >
                {isDark ? (
                  <Moon size={14} className="text-blue-400" />
                ) : (
                  <Sun size={14} className="text-yellow-500" />
                )}
              </motion.div>
            </button>

            <div className="hidden sm:flex gap-3 items-center">
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 mr-4"
              >
                How it Works
              </button>

              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 mr-4"
              >
                Features
              </button>

              <Link
                to="/About"
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 mr-4"
              >
                About
              </Link>

              {/* Updated Navbar Buttons */}
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 mb-6">
              <Shield size={18} className="text-blue-600" />
              <span className="font-semibold text-blue-600 dark:text-cyan-400">
                About FraudLens
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
              Building India's
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Scam Shield
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              FraudLens is an AI-powered cyber intelligence platform designed to
              detect phishing, fake websites, fraudulent SMS, scam screenshots
              and emerging digital threats in real time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "Protect people from rapidly evolving online scams using AI and automation.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              desc: "Create a safer digital India where every user can verify threats instantly.",
            },
            {
              icon: Brain,
              title: "AI Powered",
              desc: "Leverage Gemini AI, OCR and intelligent context analysis.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center mb-6">
                <item.icon
                  size={28}
                  className="text-blue-600 dark:text-cyan-400"
                />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">
              Why FraudLens?
            </h2>

            <div className="space-y-5">
              {[
                "Detect phishing websites instantly",
                "Analyze suspicious SMS & Emails",
                "OCR based screenshot scam detection",
                "Real-time threat intelligence feed",
                "Community reporting system",
                "AI powered contextual reasoning",
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-slate-800 flex items-center justify-center">
                    <Shield size={18} className="text-blue-600" />
                  </div>

                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-10 text-white shadow-2xl">
            <Globe size={50} className="mb-6" />

            <h3 className="text-3xl font-bold mb-5">
              Digital Trust Through AI
            </h3>

            <p className="text-blue-100 leading-relaxed">
              Every day millions of users receive fake job offers, banking scams
              and phishing links. FraudLens uses AI agents to understand context
              rather than relying only on blacklists.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              Meet Team Securing_India
            </h2>

            <p className="text-slate-600 dark:text-slate-400">
              The minds behind FraudLens.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center shadow-sm"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-5 flex items-center justify-center">
                  <Users className="text-white" size={30} />
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white">
                  {member.name}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-12 text-white shadow-2xl">
            <Shield size={50} className="mx-auto mb-6" />

            <h2 className="text-4xl font-black mb-5">Join Our Mission</h2>

            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Help us make the internet safer and smarter through AI-powered
              fraud detection.
            </p>

            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:scale-105 transition">
              Explore FraudLens
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
