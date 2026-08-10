import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";

const footerLinks = {
  Product: [
    ["Scanner", "/#scanner"],
    ["Features", "/#features"],
    ["How it works", "/#how-it-works"],
  ],
  Company: [
    ["About us", "/about"],
    ["Sign in", "/login"],
    ["Create account", "/register"],
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5" aria-label="FraudLens home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-blue-500/25">
              <ShieldCheck size={22} />
            </span>
            <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
              Fraud<span className="text-blue-600 dark:text-cyan-300">Lens</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm leading-7 text-slate-600 dark:text-slate-300">
            Clear, AI-powered fraud intelligence for safer decisions online.
          </p>
          <a href="mailto:support@fraudlens.ai" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-cyan-600 dark:text-cyan-300">
            <Mail size={16} /> support@fraudlens.ai <ArrowUpRight size={15} />
          </a>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h2 className="text-sm font-bold uppercase tracking-[.16em] text-slate-950 dark:text-white">{heading}</h2>
            <ul className="mt-5 space-y-3">
              {links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} FraudLens. All rights reserved.</p>
          <p>See the threat. Keep your confidence.</p>
        </div>
      </div>
    </footer>
  );
}
