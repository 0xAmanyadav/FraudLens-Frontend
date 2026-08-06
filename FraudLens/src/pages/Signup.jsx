import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
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
  User,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 👉 Backend API Base URL from .env file (Vite standard)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Helper function to sync user with your backend database
  const syncUserWithBackend = async (user) => {
    const token = await user.getIdToken();

    console.log("🔑 Firebase ID Token:", token);
    console.log("📊 Token Type:", typeof token);

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.displayName || name,
        email: user.email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server sync failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Backend sync success:", data);
    return data;
  };

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // 1. Firebase Authentication Signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Update Firebase Profile Name
      await updateProfile(res.user, {
        displayName: name,
      });

      // 3. Sync user data to your MongoDB backend (Blocking dependency)
      await syncUserWithBackend(res.user);

      // 4. Navigate to dashboard only if everything succeeds
      navigate("/app/dashboard");
    } catch (err) {
      console.error("❌ Signup or Sync failed:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      // Sync Google user with backend database (Blocking dependency)
      await syncUserWithBackend(res.user);

      navigate("/app/dashboard");
    } catch (err) {
      console.error("❌ Google Signup or Sync failed:", err);
      setError(err.message || "Google Signup Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-4 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md max-h-[95dvh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10">
                <Shield
                  size={28}
                  className="text-blue-600 dark:text-blue-500"
                />
              </div>
            </div>

            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              FraudLens
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
              Create Your Account 🚀
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* NAME */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Aman Yadav"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full py-2.5 pl-10 pr-12 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full py-2.5 pl-10 pr-12 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="p-3 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* SIGNUP BUTTON */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-3 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-70"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                OR
              </span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold shadow-sm transition-all disabled:opacity-70"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google"
              />
              Continue with Google
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="mt-6 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-500 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
