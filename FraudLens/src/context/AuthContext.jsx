// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import { auth } from "../firebase/firebase";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     return auth.onAuthStateChanged(setUser);
//   }, []);

//   const login = (email, password) =>
//     signInWithEmailAndPassword(auth, email, password);

//   const register = (email, password) =>
//     createUserWithEmailAndPassword(auth, email, password);

//   const logout = () => signOut(auth);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         register,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // TODO: Implement Firebase login
    // const result = await signInWithEmailAndPassword(auth, email, password);
    // setUser(result.user);
    console.log("Login:", email, password);
  };

  const register = async (email, password) => {
    // TODO: Implement Firebase register
    // const result = await createUserWithEmailAndPassword(auth, email, password);
    // setUser(result.user);
    console.log("Register:", email, password);
  };

  const logout = async () => {
    // TODO: Implement Firebase logout
    // await signOut(auth);
    setUser(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
