import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    //check if a user is logged in or not, and set current user
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    //cleanup function, prevents memory leaking
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
        {/* the children will be the application */}
      {children}
    </AuthContext.Provider>
  );
};