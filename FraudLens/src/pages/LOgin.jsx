import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login success hone par dynamic redirect (username/email based)
    
      navigate(`/app/dashboard`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
     
      navigate(`/app/dashboard`);
    } catch (err) {
      setError(err.message || "Google Login Failed");
    }
  }

  return (
    // 🛠️ FIX: 'h-[100dvh]' hata kar 'fixed inset-0' lagaya. Yeh page ko screen ke 4 kono par freeze kar dega.
    <div className="fixed inset-0 flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
      {/* ... BAAKI KA PURA CODE SAME RAHEGA ... */}


        <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Logo */}
          {/* 🛠️ FIX 2: Reduced margins (mb-5 instead of mb-8) to save vertical space */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-blue-500/20">
                <Shield size={28} className="text-blue-500" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              FraudLens
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Welcome Back 👋
            </p>
          </div>

          {/* FORM */}
          {/* 🛠️ FIX 3: Reduced gap between inputs (space-y-4 instead of space-y-5) */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* EMAIL */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>

              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  // 🛠️ FIX 4: Padding adjusted (py-2.5)
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>

              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-2.5 pl-10 pr-12 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
              <span className="text-slate-400 text-xs uppercase tracking-wider">OR</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm font-medium transition-colors"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
              Continue with Google
            </button>
          </form>

          {/* REGISTER */}
          <p className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        <p className="text-center mt-4 text-xs text-slate-400 font-medium tracking-wide">
          Protected by enterprise-grade AI security
        </p>
      </motion.div>
    </div>
  );
}