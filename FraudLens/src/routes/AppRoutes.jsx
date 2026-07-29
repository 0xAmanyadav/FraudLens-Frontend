// import { Routes, Route } from "react-router-dom";
// import About from "../pages/About";
// import Login from "../pages/LOgin";
// import Signup from "../pages/Signup";
// import Dashboard from "../pages/Dashboard";
// import Landing from "../pages/Landing";
// // import ScanCenter from "../pages/ScanCenter";
// // import UrlScanner from "../pages/UrlScanner";
// // import MessageScanner from "../pages/MessageScanner";
// // import ScreenshotScanner from "../pages/ScreenshotScanner";
// // import ThreatFeed from "../pages/ThreatFeed";
// // import Analytics from "../pages/Analytics";
// // import Settings from "../pages/Settings";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Landing />} />
//       <Route path="/About" element={<About />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Signup />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       {/* <Route path="/scan" element={<ScanCenter />} />
//       <Route path="/url" element={<UrlScanner />} />
//       <Route path="/message" element={<MessageScanner />} />
//       <Route path="/image" element={<ScreenshotScanner />} />
//       <Route path="/threats" element={<ThreatFeed />} />
//       <Route path="/analytics" element={<Analytics />} />
//       <Route path="/settings" element={<Settings />} /> */}
//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Login from "../pages/LOgin";
import Signup from "../pages/Signup";
import Landing from "../pages/Landing";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard Pages
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import ScanCenter from "../services/ScanCenter";
import UrlScanner from "../services/UrlScanner";
import MessageScanner from "../services/MessageScanner";
import QrScanner from "../services/QrScanner";
// import History from "../pages/History";



export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC PAGES (Bina Sidebar ke) ================= */}
      <Route path="/" element={<Landing />} />
      <Route path="/About" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      {/* ================= DASHBOARD SYSTEM (Sidebar + Navbar Layout) ================= */}
      <Route path="/app/dashboard" element={<DashboardLayout />}>
        {/* "index" ka matlab hai jab path sirf "/app/dashboard" ho, tab ye render hoga */}
        <Route index element={<Dashboard />} />
        <Route path="scan" element={<ScanCenter />} />
        <Route path="url" element={<UrlScanner />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="message" element={<MessageScanner />} />
        <Route path="qr" element={<QrScanner />} />
        {/* <Route path="History" element={<History />} /> */}

        {/* 
        
        
        <Route path="threats" element={<ThreatFeed />} />
        <Route path="analytics" element={<Analytics />} />
        */}
      </Route>
    </Routes>
  );
}
