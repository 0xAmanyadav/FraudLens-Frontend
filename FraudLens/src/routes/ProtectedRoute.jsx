import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Yeh listener page refresh par Firebase session ko properly detect karta hai
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Check complete hone ke baad loading band
    });

    return () => unsubscribe();
  }, []);

  // Jab tak Firebase check kar raha hai, tab tak blank screen ya loader dikhayein (Redirect na karein)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white font-medium">
        Loading session...
      </div>
    );
  }

  // Agar session check hone ke baad bhi user nahi milta, tabhi login par bhejein
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
