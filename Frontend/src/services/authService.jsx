// src/services/authServices.jsx
import API from "./api";

// ------------------- REGISTER ------------------- //
export const registerUser = async (userData) => {
  try {
    const { data } = await API.post("/auth/register", userData);
    return data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Network or server error");
  }
};

// ------------------- LOGIN ------------------- //
export const login = async (credentials) => {
  try {
    const { data } = await API.post("/auth/login", credentials);

    // Store token & user in localStorage
    if (data?.token) {
      localStorage.setItem("token", data.token);
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    }

    return data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Network or server error");
  }
};

// ------------------- LOGOUT ------------------- //
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ------------------- GET USERS REGISTERED THIS MONTH (Admin) ------------------- //
export const getUsersRegisteredThisMonth = async () => {
  try {
    const { data } = await API.get("/auth/stats/this-month");
    return data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Network or server error");
  }
};

// ------------------- GET CURRENT USER ------------------- //
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};
