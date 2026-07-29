import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="p-2 rounded-xl border
      bg-white dark:bg-slate-800"
    >
      {isDark ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </motion.button>
  );
}