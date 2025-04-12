import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { login, signUp } from "../api/Authentication";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const userLogin = async (username, password) => {
    try {
      const user = await login(username, password);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return null;
    } catch (error) {
      return error.message;
    }
  };

  const userSignUp = async (username, password) => {
    try {
      const user = await signUp(username, password);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return null;
    } catch (error) {
      return error.message;
    }
  };

  const userLogout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, userLogin, userSignUp, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
