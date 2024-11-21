import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // User auth state
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AuthService.getUser();
        setAuth(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const user = await AuthService.login(credentials);
      setAuth(user);
      navigate("/dashboard"); // Redirect after login
      return { status: 200 }; // Return status or the whole response
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setAuth(null);
    navigate("/login");
  };

  // Add the register function
  const register = async (userData) => {
    try {
      const user = await AuthService.register(userData);
      setAuth(user);
      navigate("/dashboard"); // Redirect after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
      <AuthContext.Provider value={{ auth, login, logout, register, loading }}>
        {!loading && children}
      </AuthContext.Provider>
  );
};
