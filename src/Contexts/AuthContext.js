import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext(); //created a context of react

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(); //state to manage the current user which will be updated when the user is changed
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    console.log("reached");
    return auth.createUserWithEmailAndPassword(email, password);

    //whenever this is called the user gets set
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);

    //whenever this is called the user gets set
  }
  function logout(email, password) {
    return auth.signOut();

    //whenever this is called the user gets set
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  // using effect when ever the state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
