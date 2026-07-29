import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import logo from "../assets/company_logo/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="FraudLens"
                className="h-15 w-auto rounded-md"
              />
              {/* <span className="text-xl font-bold text-slate-900 dark:text-white">
                FraudLens
              </span> */}
            </Link>

            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-sm">
              AI-powered threat detection for phishing, scam websites,
              fraudulent messages and screenshots.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-slate-900 dark:hover:text-white"
              >
                {/* <Github size={18} /> */}
              </a>
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="text-slate-600 hover:text-slate-900 dark:hover:text-white"
              >
                {/* Twitter */}
              </button>
              <a
                href="mailto:team@fraudlens.example"
                className="text-slate-600 hover:text-slate-900 dark:hover:text-white"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
              Product
            </h3>
            <ul className="space-y-3 mt-4 text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  to="/scan"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  URL Scanner
                </Link>
              </li>
              <li>
                <Link
                  to="/scan"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Message Scanner
                </Link>
              </li>
              <li>
                <Link
                  to="/scan"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Screenshot Scanner
                </Link>
              </li>
              <li>
                <Link
                  to="/threats"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Live Threat Feed
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Security Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-3 mt-4 text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Features
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
              Team
            </h3>
            <ul className="space-y-3 mt-4 text-slate-600 dark:text-slate-400">
              <li>Aman Yadav — Frontend</li>
              <li>Prakhar Gupta — Backend</li>
              <li>Adarsh Gupta — UI/UX</li>
              <li>Vinayak Chauhan — Presentation</li>
              <li>Aditya Singh — Research</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-500">
            © 2026 FraudLens. All Rights Reserved.
          </p>
          <p className="text-slate-500">Built with ❤️ for TNX Codathon 2K26</p>
        </div>
      </div>
    </footer>
  );
}
