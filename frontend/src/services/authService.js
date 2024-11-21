import axios from "axios";

const API_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:5000/api";

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, userData);
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error.response?.data || error.message);
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};

const authService = {
  register,
  login,
  logout,
  getUser,
};

export default authService;
