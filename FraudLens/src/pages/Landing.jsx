import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import logo from "../assets/company_logo/logo.png";
import Features from "../components/Features";
import Footer from "../components/Footer";
import {
  Activity,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CircleAlert,
  Cpu,
  Globe,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Radar,
  ScanLine,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  UserRound,
  X,
  Zap,
} from "lucide-react";

/* ----------------------------- */
/* Animation presets */
/* ----------------------------- */

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ----------------------------- */
/* Scanner tabs */
/* ----------------------------- */

const scannerTabs = [
  {
    id: "url",
    label: "URL",
    placeholder: "https://suspicious-link.com",
    icon: Globe,
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Paste suspicious SMS or message...",
    icon: MessageSquare,
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Paste suspicious email...",
    icon: Mail,
  },
];

/* ----------------------------- */
/* Floating cyber particles */
/* ----------------------------- */

function CyberParticles() {
  const particles = Array.from({ length: 35 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 70}%`,
              `${Math.random() * 100}%`,
            ],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
          className="absolute h-1 w-1 rounded-full bg-cyan-500 dark:bg-cyan-300"
        />
      ))}
    </div>
  );
}

/* ----------------------------- */
/* Threat Radar */
/* ----------------------------- */

function ThreatRadar() {
  return (
    <div className="relative mx-auto h-[360px] w-[360px] sm:h-[430px] sm:w-[430px]">
      {/* Outer glow */}
      <div className="absolute inset-10 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 blur-3xl" />

      {/* Radar rings */}
      {[1, 0.78, 0.56, 0.34].map((scale, index) => (
        <motion.div
          key={index}
          animate={{
            scale: [scale, scale * 1.04, scale],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 3 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/30 dark:border-cyan-400/20"
          style={{
            width: `${scale * 100}%`,
          }}
        />
      ))}

      {/* Rotating radar */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-[16%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(6,182,212,.3) 35deg, transparent 75deg)",
        }}
      />

      {/* Radar crosshair */}
      <div className="absolute left-1/2 top-1/2 h-[70%] w-px -translate-x-1/2 -translate-y-1/2 bg-cyan-500/20 dark:bg-cyan-400/10" />
      <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/20 dark:bg-cyan-400/10" />

      {/* Threat nodes */}
      {[
        "left-[23%] top-[30%]",
        "right-[18%] top-[24%]",
        "left-[17%] bottom-[25%]",
        "right-[26%] bottom-[19%]",
      ].map((position, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + i * 0.4,
            repeat: Infinity,
          }}
          className={`absolute ${position} z-20`}
        >
          <div className="h-3 w-3 rounded-full bg-rose-500 dark:bg-rose-400 shadow-[0_0_20px_rgba(244,63,94,.9)]" />
        </motion.div>
      ))}

      {/* Center */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(6,182,212,.15)",
            "0 0 60px rgba(6,182,212,.35)",
            "0 0 20px rgba(6,182,212,.15)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 z-30 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-cyan-500/30 dark:border-cyan-300/30 bg-white/90 dark:bg-[#071526]/90 backdrop-blur-xl shadow-xl"
      >
        <ShieldCheck className="text-cyan-600 dark:text-cyan-300" size={48} />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 rounded-[1.5rem] border border-dashed border-cyan-500/30 dark:border-cyan-400/20"
        />
      </motion.div>

      {/* Labels */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute left-0 top-16 rounded-xl border border-cyan-500/30 dark:border-cyan-400/20 bg-white/90 dark:bg-[#071526]/80 px-3 py-2 text-[10px] font-bold text-cyan-700 dark:text-cyan-300 backdrop-blur shadow-sm"
      >
        THREAT: 04
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute bottom-14 right-0 rounded-xl border border-emerald-500/30 dark:border-emerald-400/20 bg-white/90 dark:bg-[#071526]/80 px-3 py-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 backdrop-blur shadow-sm"
      >
        SYSTEM SECURE
      </motion.div>
    </div>
  );
}

/* ----------------------------- */
/* AI Terminal */
/* ----------------------------- */

function AITerminal() {
  const lines = [
    "Initializing FraudLens AI...",
    "Loading threat intelligence...",
    "Analyzing behavioral patterns...",
    "Cross-checking indicators...",
    "Generating risk assessment...",
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-cyan-400/15 bg-white dark:bg-[#020817] shadow-2xl shadow-slate-950/10 dark:shadow-cyan-950/30">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 px-4 py-3 bg-slate-50 dark:bg-transparent">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

        <span className="ml-3 text-[10px] font-mono text-slate-500">
          fraudlens://ai-engine
        </span>
      </div>

      <div className="space-y-2 p-5 font-mono text-xs">
        {lines.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: i * 0.6,
              duration: 0.4,
            }}
            className="flex gap-2"
          >
            <span className="text-cyan-600 dark:text-cyan-400">&gt;</span>
            <span className="text-slate-600 dark:text-slate-400">{line}</span>
          </motion.div>
        ))}

        <motion.div
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="pt-2 text-cyan-600 dark:text-cyan-300 font-bold"
        >
          █ AI ENGINE ACTIVE
        </motion.div>
      </div>
    </div>
  );
}

/* ----------------------------- */
/* Main Landing */
/* ----------------------------- */

export default function Landing() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("url");
  const [query, setQuery] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const currentTab = scannerTabs.find((tab) => tab.id === activeTab);

  const handleScan = () => {
    if (!query.trim() || scanning) return;

    const signedIn = Boolean(
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("user"),
    );

    if (!signedIn) {
      navigate("/login");
      return;
    }

    setScanning(true);
    setResult(null);

    setTimeout(() => {
      const suspicious =
        /free|gift|verify|urgent|wallet|prize|crypto|login|bank|click/i.test(
          query,
        );

      if (suspicious) {
        setResult({
          risk: "HIGH",
          score: 92,
          message:
            "Multiple suspicious indicators detected. The signal contains patterns commonly associated with phishing, impersonation or social engineering.",
        });
      } else {
        setResult({
          risk: "LOW",
          score: 16,
          message:
            "No major threat indicators were detected during this quick analysis.",
        });
      }

      setScanning(false);
    }, 1500);
  };

  const switchTab = (id) => {
    setActiveTab(id);
    setQuery("");
    setResult(null);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#030712] dark:text-white transition-colors duration-500">
      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.25] dark:opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.12) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 70, 0],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-[30%] h-[550px] w-[550px] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-[130px]"
        />

        <CyberParticles />
      </div>

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="relative z-50 border-b border-slate-200 dark:border-white/[0.06] bg-white/80 dark:bg-[#030712]/70 backdrop-blur-xl transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="relative grid h-11 w-11 place-items-center rounded-xl border border-cyan-500/30 dark:border-cyan-300/20 bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-300 shadow-sm"
            >
              {/* <img src={logo} alt="FraudLens" className="h-6 w-auto rounded" /> */}
              <ShieldCheck size={26} className="text-blue-600" />

              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-xl border border-cyan-500 dark:border-cyan-400"
              />
            </motion.div>

            <div>
              <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Fraud
                <span className="text-cyan-600 dark:text-cyan-300">Lens</span>
              </div>

              <div className="hidden text-[8px] font-mono tracking-[.25em] text-slate-500 sm:block">
                DIGITAL THREAT INTELLIGENCE
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400 md:flex">
            <a
              href="#scanner"
              className="transition hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              Scanner
            </a>
            <a
              href="#intelligence"
              className="transition hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              Intelligence
            </a>
            <a
              href="#how-it-works"
              className="transition hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              How it works
            </a>
            <a
              href="#features"
              className="transition hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              Features
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 transition hover:border-cyan-500/30 dark:hover:border-cyan-400/30 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <Link
              to="/login"
              className="hidden rounded-xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 transition hover:border-cyan-500/30 dark:hover:border-cyan-400/30 hover:text-slate-900 dark:hover:text-white sm:block shadow-sm bg-white dark:bg-transparent"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="hidden rounded-xl bg-cyan-500 dark:bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-400 dark:hover:bg-cyan-300 sm:block shadow-md"
            >
              Get Protected
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent md:hidden shadow-sm"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#050b16] px-5 py-4 md:hidden shadow-xl"
            >
              {[
                ["Scanner", "#scanner"],
                ["Intelligence", "#intelligence"],
                ["How it works", "#how-it-works"],
                ["Features", "#features"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-slate-100 dark:border-white/5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-75px)] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          {/* <motion.div
            variants={reveal}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 dark:border-cyan-400/20 bg-cyan-50 dark:bg-cyan-400/5 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-cyan-700 dark:text-cyan-300 shadow-sm"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.3, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400"
            />
            AI THREAT ENGINE ONLINE
          </motion.div> */}

          <motion.h1
            variants={reveal}
            className="max-w-3xl text-5xl font-black leading-[1.1] tracking-[-.04em] text-slate-900 dark:text-white sm:text-6xl lg:text-5xl"
          >
            Think Like AI.
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 dark:from-cyan-300 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
              Defend Like an Expert.
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-7 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg"
          >
            FraudLens is an AI-powered digital threat intelligence platform that
            analyzes suspicious links, messages and emails before you trust
            them.
          </motion.p>

          <motion.div variants={reveal} className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() =>
                document
                  .getElementById("scanner")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-2 rounded-xl bg-cyan-500 dark:bg-cyan-400 px-5 py-3.5 font-black text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-1 hover:bg-cyan-400 dark:hover:bg-cyan-300"
            >
              Start threat scan
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </button>

            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.03] px-5 py-3.5 font-bold text-slate-700 dark:text-slate-200 transition hover:-translate-y-1 hover:border-cyan-500/30 dark:hover:border-cyan-400/30 shadow-sm"
            >
              <ShieldCheck
                size={18}
                className="text-cyan-600 dark:text-cyan-400"
              />
              Create account
            </Link>
          </motion.div>

          {/* Mini metrics */}
          <motion.div
            variants={reveal}
            className="mt-10 grid max-w-lg grid-cols-3 border-y border-slate-200 dark:border-white/[0.07] py-5"
          >
            {[
              ["99.7%", "Detection"],
              ["<2s", "Analysis"],
              ["24/7", "Monitoring"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-r border-slate-200 dark:border-white/[0.07] px-4 first:pl-0 last:border-0"
              >
                <p className="text-xl font-black text-slate-900 dark:text-white">
                  {value}
                </p>
                <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <ThreatRadar />

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 w-[290px] -translate-x-1/2 sm:w-[340px]"
          >
            <AITerminal />
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================= */}
      {/* SCANNER */}
      {/* ================================================= */}

      <section
        id="scanner"
        className="relative z-10 border-y border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#050b16] py-24 shadow-sm"
      >
        <div className="mx-auto max-w-5xl px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center"
          >
            <motion.div
              variants={reveal}
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.25em] text-cyan-600 dark:text-cyan-300"
            >
              <ScanLine size={15} />
              LIVE THREAT SCANNER
            </motion.div>

            <motion.h2
              variants={reveal}
              className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            >
              Don't guess.
              <span className="text-cyan-600 dark:text-cyan-300">
                {" "}
                Scan it.
              </span>
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400"
            >
              Submit a suspicious digital signal and let the FraudLens engine
              investigate it.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-cyan-400/15 bg-slate-50 dark:bg-[#020817] p-2 text-left shadow-xl dark:shadow-cyan-950/20"
            >
              {/* Tabs */}
              <div className="flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-white/[0.06] p-1">
                {scannerTabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => switchTab(tab.id)}
                      className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                        active
                          ? "bg-cyan-500 dark:bg-cyan-400 text-slate-950 shadow-sm"
                          : "text-slate-500 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-3 transition focus-within:border-cyan-500/40 dark:focus-within:border-cyan-400/40 shadow-sm">
                    <Search
                      size={19}
                      className="shrink-0 text-cyan-600 dark:text-cyan-400"
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleScan();
                        }
                      }}
                      placeholder={currentTab?.placeholder}
                      className="w-full bg-transparent text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                  </div>

                  <button
                    onClick={handleScan}
                    disabled={scanning || !query.trim()}
                    className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 dark:bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-400 dark:hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 shadow-md"
                  >
                    {scanning ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Radar size={18} />
                        </motion.span>
                        Analyzing
                      </>
                    ) : (
                      <>
                        <Zap size={18} />
                        Analyze
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {scanning && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-5 overflow-hidden rounded-xl border border-cyan-500/30 dark:border-cyan-400/20 bg-cyan-50 dark:bg-cyan-400/5 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <Activity
                          size={18}
                          className="animate-pulse text-cyan-600 dark:text-cyan-300"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-cyan-700 dark:text-cyan-300 font-bold">
                              AI ANALYSIS
                            </span>
                            <span className="text-slate-500">scanning...</span>
                          </div>
                          <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                            <motion.div
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                              }}
                              className="h-full w-1/2 bg-cyan-500 dark:bg-cyan-400"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {result && !scanning && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-5 rounded-2xl border p-5 ${
                        result.risk === "HIGH"
                          ? "border-rose-400/30 bg-rose-50 dark:bg-rose-400/5 text-slate-900 dark:text-white"
                          : "border-emerald-400/30 bg-emerald-50 dark:bg-emerald-400/5 text-slate-900 dark:text-white"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                            result.risk === "HIGH"
                              ? "bg-rose-100 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400"
                              : "bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {result.risk === "HIGH" ? (
                            <ShieldAlert size={22} />
                          ) : (
                            <ShieldCheck size={22} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="font-black">
                              {result.risk === "HIGH"
                                ? "THREAT DETECTED"
                                : "SIGNAL LOOKS SAFE"}
                            </h3>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-black ${
                                result.risk === "HIGH"
                                  ? "bg-rose-200/50 dark:bg-rose-400/10 text-rose-700 dark:text-rose-300"
                                  : "bg-emerald-200/50 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300"
                              }`}
                            >
                              {result.score}% risk
                            </span>
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {result.message}
                          </p>

                          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${result.score}%` }}
                              transition={{ duration: 0.8 }}
                              className={`h-full ${
                                result.risk === "HIGH"
                                  ? "bg-rose-500 dark:bg-rose-400"
                                  : "bg-emerald-500 dark:bg-emerald-400"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================= */}
      {/* INTELLIGENCE */}
      {/* ================================================= */}

      <section
        id="intelligence"
        className="relative z-10 mx-auto max-w-7xl px-5 py-28 lg:px-8"
      >
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={reveal}
              className="flex items-center gap-2 font-mono text-xs font-bold tracking-[.2em] text-cyan-600 dark:text-cyan-300"
            >
              <Cpu size={16} />
              INTELLIGENCE LAYER
            </motion.div>

            <motion.h2
              variants={reveal}
              className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            >
              Security that
              <br />
              <span className="text-slate-400 dark:text-slate-500">
                thinks in patterns.
              </span>
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-6 leading-8 text-slate-600 dark:text-slate-400"
            >
              Fraud is rarely just one suspicious word or one strange URL.
              FraudLens looks at the bigger picture and connects multiple
              signals to create a clearer risk assessment.
            </motion.p>

            <motion.div variants={reveal} className="mt-8 space-y-4">
              {[
                [
                  ShieldCheck,
                  "Behavioral analysis",
                  "Identify social engineering and impersonation patterns.",
                ],
                [
                  Radar,
                  "Threat intelligence",
                  "Cross-check suspicious indicators against known patterns.",
                ],
                [
                  Bot,
                  "AI reasoning",
                  "Turn complex signals into a simple human-readable result.",
                ],
              ].map(([Icon, title, text]) => (
                <motion.div
                  key={title}
                  whileHover={{ x: 8 }}
                  className="group flex gap-4 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-4 transition hover:border-cyan-500/30 dark:hover:border-cyan-400/20 shadow-sm"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-50 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-300">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Terminal visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-cyan-500/5 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#020817] p-5 shadow-xl dark:shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-4 bg-slate-50 dark:bg-transparent -mx-5 -mt-5 p-5">
                <div className="flex items-center gap-3">
                  <Terminal
                    size={18}
                    className="text-cyan-600 dark:text-cyan-300"
                  />
                  <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
                    THREAT_ANALYSIS
                  </span>
                </div>

                <span className="flex items-center gap-2 font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  ONLINE
                </span>
              </div>

              <div className="space-y-5 py-6">
                {[
                  ["DOMAIN_REPUTATION", 94],
                  ["LANGUAGE_ANALYSIS", 87],
                  ["BEHAVIOR_PATTERN", 91],
                  ["IDENTITY_MATCH", 76],
                ].map(([label, value], index) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between font-mono text-[10px]">
                      <span className="text-slate-500">{label}</span>
                      <span className="text-cyan-600 dark:text-cyan-300 font-bold">
                        {value}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.15 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      />
                    </div>
                  </div>
                ))}

                <div className="rounded-xl border border-rose-400/30 bg-rose-50 dark:bg-rose-400/5 p-4">
                  <div className="flex items-center gap-3">
                    <CircleAlert
                      size={19}
                      className="text-rose-500 dark:text-rose-400"
                    />
                    <div>
                      <p className="text-xs font-black text-rose-700 dark:text-rose-300">
                        THREAT SIGNAL
                      </p>
                      <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                        Suspicious impersonation pattern detected.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-cyan-50 dark:bg-cyan-400/5 p-4 border border-cyan-500/20 dark:border-cyan-400/10">
                  <div>
                    <p className="text-[9px] font-mono text-slate-500">
                      FINAL RISK SCORE
                    </p>
                    <p className="mt-1 text-3xl font-black text-cyan-600 dark:text-cyan-300">
                      86
                      <span className="text-sm text-slate-500">/100</span>
                    </p>
                  </div>
                  <ShieldAlert
                    size={42}
                    className="text-rose-500 dark:text-rose-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================= */}
      {/* HOW IT WORKS */}
      {/* ================================================= */}

      <section
        id="how-it-works"
        className="relative z-10 border-y border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#050b16] py-28 shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="font-mono text-xs font-bold tracking-[.25em] text-cyan-600 dark:text-cyan-300">
              THE PROCESS
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Three steps.
              <span className="text-slate-400 dark:text-slate-500">
                {" "}
                Zero confusion.
              </span>
            </h2>
          </div>

          <div className="relative mt-16 grid gap-5 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-16 hidden h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 md:block" />

            {[
              [
                "01",
                Search,
                "Submit",
                "Paste a suspicious URL, message or email.",
              ],
              [
                "02",
                ScanLine,
                "Investigate",
                "AI analyzes patterns, context and threat signals.",
              ],
              [
                "03",
                ShieldCheck,
                "Protect",
                "Get a clear risk score and recommended next step.",
              ],
            ].map(([number, Icon, title, text], index) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="group relative z-10 rounded-[1.5rem] border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#07101e] p-7 transition hover:border-cyan-500/30 dark:hover:border-cyan-400/20 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-100 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-300 transition group-hover:bg-cyan-500 group-hover:text-slate-950">
                    <Icon size={24} />
                  </div>
                  <span className="font-mono text-4xl font-black text-slate-300 dark:text-white/5">
                    {number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-black text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {text}
                </p>

                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-300">
                  Explore
                  <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FEATURES */}
      {/* ================================================= */}

      <section id="features" className="relative z-10">
        <Features />
      </section>

      {/* ================================================= */}
      {/* FINAL CTA */}
      {/* ================================================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-cyan-500/30 dark:border-cyan-400/20 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 dark:from-[#071827] dark:via-[#061323] dark:to-[#080b20] px-7 py-16 text-center shadow-2xl shadow-blue-500/20 dark:shadow-cyan-950/30 sm:px-12 text-white"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 dark:border-cyan-400/10 pointer-events-none"
          />

          <div className="relative">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/30 dark:border-cyan-400/20 bg-white/10 dark:bg-cyan-400/10 text-white dark:text-cyan-300 shadow-inner"
            >
              <ShieldCheck size={30} />
            </motion.div>

            <p className="mt-6 font-mono text-[10px] font-bold tracking-[.3em] text-cyan-200 dark:text-cyan-300">
              YOUR DIGITAL DEFENSE STARTS HERE
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Turn suspicious moments into
              <span className="text-cyan-200 dark:text-cyan-300">
                {" "}
                confident decisions.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-blue-100 dark:text-slate-400">
              Join FraudLens and give yourself an AI-powered second opinion
              whenever something online feels wrong.
            </p>

            <Link
              to="/signup"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white dark:bg-cyan-400 px-6 py-3.5 font-black text-blue-700 dark:text-slate-950 transition hover:-translate-y-1 hover:bg-slate-100 dark:hover:bg-cyan-300 shadow-xl"
            >
              Enter FraudLens
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
