import Footer from "../components/Footer";
import Features from "../components/Features";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import logo from "../assets/company_logo/logo.png";

import {
  Shield,
  ArrowRight,
  Lock,
  Zap,
  CheckCircle,
  Users,
  AlertTriangle,
  Cpu,
  BarChart3,
  Radar,
  Sun,
  Moon,
  Globe,
  MessageSquare,
  Image as ImageIcon,
  Search,
  Activity,
  FileText,
  Smartphone,
  CreditCard,
  Briefcase,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const floatingVariants = {
  float: {
    y: [0, -10, 0],
    boxShadow: [
      "0px 10px 30px rgba(59, 130, 246, 0.05)",
      "0px 20px 40px rgba(59, 130, 246, 0.15)",
      "0px 10px 30px rgba(59, 130, 246, 0.05)",
    ],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Landing() {
  const navigate = useNavigate(); // Added for redirection
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("url");

  // Mocking Auth State (Set to false since this is the landing page)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleMockScan = (e) => {
    e.preventDefault();

    // Check if user is logged in before scanning
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page immediately
      return;
    }

    // This code only runs if isLoggedIn is true
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult("danger");
    }, 2000);
  };

  return (
    <div className={mounted && isDark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-500 font-sans">
        {/* Soft Light Gradients for Light Theme */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-100/60 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-100/50 dark:bg-purple-600/10 rounded-full blur-[120px]"></div>
        </div>

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
                  className="h-14 w-auto rounded-md"
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

        {/* 1. Hero Section */}
        <section className="relative pt-40 pb-16 px-6 flex items-center z-10">
          <div className="max-w-7xl mx-auto w-full text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-6 max-w-4xl mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-blue-700 dark:text-cyan-400 backdrop-blur-sm shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 dark:bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-cyan-500"></span>
                </span>
                AI Scam Detection Engine Active
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white"
              >
                Think Like AI. <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-purple-500 bg-clip-text text-transparent">
                  Defend Like an Expert.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-medium"
              >
                Every day, millions fall victim to digital fraud. Paste a
                suspicious link, SMS, or screenshot below and let our
                Gemini-powered engine detect the scam instantly.
              </motion.p>

              {/* LIVE SCANNER UI (Light Mode Optimized) */}
              <motion.div
                variants={itemVariants}
                className="mt-8 w-full max-w-3xl bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl p-3 shadow-xl shadow-slate-200/50 dark:shadow-cyan-900/10 text-left relative z-20"
              >
                <div className="flex space-x-1 mb-3 px-1 border-b border-slate-100 dark:border-slate-800 pb-3">
                  {[
                    { id: "url", icon: Globe, label: "Scan URL" },
                    {
                      id: "msg",
                      icon: MessageSquare,
                      label: "Check SMS/Email",
                    },
                    { id: "img", icon: ImageIcon, label: "Upload Screenshot" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? "bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                    >
                      <tab.icon size={16} /> <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={handleMockScan}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="flex-1 flex items-center gap-3 px-4 bg-slate-50 dark:bg-[#0B1120] rounded-xl border border-slate-200 dark:border-slate-800 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={
                        activeTab === "url"
                          ? "Paste suspicious link (e.g., http://hdfc-update.xyz)..."
                          : "Paste message or upload image..."
                      }
                      className="w-full bg-transparent border-none text-slate-900 dark:text-white focus:outline-none focus:ring-0 placeholder-slate-400 text-sm py-3"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isScanning}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 min-w-[160px]"
                  >
                    {isScanning ? (
                      <>
                        <Activity className="w-5 h-5 animate-spin" /> Scanning
                      </>
                    ) : (
                      "Analyze Risk"
                    )}
                  </button>
                </form>

                {/* Mock Scan Result Display */}
                {scanResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl flex gap-3 items-start"
                  >
                    <AlertTriangle
                      className="text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                      size={20}
                    />
                    <div>
                      <h4 className="font-bold text-red-800 dark:text-red-300">
                        98% High Risk Scam Detected
                      </h4>
                      <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
                        AI Context: The domain mimics a legitimate bank. The
                        message payload contains urgent psychological triggers
                        common in phishing attacks.
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. Tech Stack / Trust Banner */}
        <div className="border-y border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 py-8 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Powered By
            </span>
            <div className="flex gap-10 items-center font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-2">
                <Cpu size={20} className="text-blue-500" /> Google Gemini API
              </span>
              <span className="flex items-center gap-2">
                <Lock size={20} className="text-emerald-500" /> Supabase
              </span>
              <span className="flex items-center gap-2">
                <Zap size={20} className="text-teal-500" /> FastAPI
              </span>
              <span className="flex items-center gap-2">
                <Globe size={20} className="text-blue-400" /> React Vite
              </span>
            </div>
          </div>
        </div>

        {/* 5. CTA Section */}
        <section className="py-24 px-5 relative z-10">
          <div className="max-w-3xl max-h-xl mx-auto">
            <div
              className="
bg-blue-600
dark:bg-slate-800
rounded-[2rem]
p-5
md:p-10
"
            >
              {/* Decorative Background Elements */}
              {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-blue-500 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-indigo-500 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
              </div> */}

              <div className="relative z-10">
                <Shield size={48} className="text-white mx-auto mb-6" />
                <h2 className="text-4xl md:text-4xl font-black mb-6 text-white leading-tight">
                  Start Defending Your Digital Identity
                </h2>
                <p
                  className="
text-lg
text-blue-100
dark:text-slate-300

max-w-2xl
mx-auto

mb-8
"
                >
                  Create a secure dashboard to manage your scan history, view
                  detailed reports, and contribute to the community feed.
                </p>
                <Link
                  to="/register"
                  className="
inline-flex
items-center
gap-2

bg-white
text-blue-600

px-8
py-4

rounded-xl
font-bold

hover:scale-105
transition
"
                >
                  Create Free Account
                  <ArrowRight size={24} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Workflow Section (How It Works) */}
        <section
          id="how-it-works"
          className="py-24 px-6 relative z-10 bg-slate-50 dark:bg-[#0B1120]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                How FraudLens Protects You
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Threat detection happens in milliseconds, right in your browser.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: FileText,
                  title: "Input the Threat",
                  desc: "Paste a suspicious URL, copy a weird SMS text, or upload a screenshot of a fake job offer.",
                },
                {
                  step: "02",
                  icon: Cpu,
                  title: "AI Context Analysis",
                  desc: "Our engine uses OCR to read images and Gemini to analyze the psychological intent behind the text.",
                },
                {
                  step: "03",
                  icon: CheckCircle,
                  title: "Get Clear Results",
                  desc: "Receive an instant Safe, Suspicious, or Scam verdict along with a detailed explanation of why.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 text-6xl font-black text-slate-50 dark:text-slate-800 group-hover:text-blue-50 dark:group-hover:text-slate-700 transition-colors -z-10 select-none">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 dark:border-slate-700 text-blue-600 dark:text-cyan-400 shadow-inner">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Use Cases (What we catch) */}
        <section className="py-24 px-6 relative z-10 bg-white dark:bg-[#111827] border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
                We Catch What Standard Tools Miss
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Traditional security relies on known blocklists. Scammers create
                new websites daily. FraudLens uses AI to read the context,
                catching zero-day scams before they are reported.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Briefcase,
                    title: "Fake Job Offers",
                    desc: "Catches 'Work from home and earn ₹5k/day' WhatsApp scams.",
                  },
                  {
                    icon: CreditCard,
                    title: "Banking & KYC Fraud",
                    desc: "Detects URLs mimicking HDFC, SBI, or ICICI login portals.",
                  },
                  {
                    icon: Smartphone,
                    title: "Delivery SMS Smishing",
                    desc: "Flags 'Your package is delayed, update address' texts.",
                  },
                ].map((threat, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30"
                  >
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm h-fit">
                      <threat.icon
                        size={20}
                        className="text-indigo-600 dark:text-indigo-400"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {threat.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {threat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Dashboard Representation */}
            <motion.div
              variants={floatingVariants}
              animate="float"
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white">
                  Community Alert Feed
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 text-xs font-bold rounded">
                  Live
                </span>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-xl flex justify-between items-center opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div>
                      <div className="text-xs font-mono text-slate-500 mb-1">
                        Vector: SMS Message
                      </div>
                      <div className="font-bold text-sm text-slate-800 dark:text-slate-200">
                        "Electricity Bill Update Required..."
                      </div>
                    </div>
                    <AlertTriangle size={18} className="text-red-500" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6. Footer */}
        {/* <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={24} className="text-blue-600 dark:text-cyan-400" />
                  <span className="font-bold text-xl text-slate-900 dark:text-white">FraudLens</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mb-6">
                  An AI-powered web platform built to instantly detect online scams, built for the AI & Agentic Systems track.
                </p>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Built by Team Securing_India:
                  <div className="text-slate-500 dark:text-slate-400 mt-2 font-normal flex flex-wrap gap-x-4 gap-y-2">
                    <span>Aman (Frontend)</span>
                    <span>Adarsh</span>
                    <span>Prakhar (Backend)</span>
                    <span>Vinayak (PPT)</span>
                    <span>Aditya (UI/UX)</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-slate-900 dark:text-white">Features</h4>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-blue-600 transition">URL Scanner</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">SMS Analysis</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Screenshot OCR</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Community Feed</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-slate-900 dark:text-white">Legal</h4>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Data Security</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-slate-500 text-sm font-medium flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2026 FraudLens. All rights reserved.</p>
              <p className="mt-2 md:mt-0">Powered by MERN, FastAPI & Gemini</p>
            </div>
          </div>
        </footer> */}
        <Features />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
