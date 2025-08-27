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

export const addAdmin = async (adminData) => {
  try {
    const token = localStorage.getItem("token"); // get current admin token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // send token in headers
      },
    };

    const { data } = await API.post("/auth/register-admin", adminData, config);
    return data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Network or server error");
  }
};


// ------------------- GET ALL USERS (Admin) ------------------- //
export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token"); // get current admin token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // send token in headers
      },
    };

    const { data } = await API.get("/auth/all-users", config);
    return data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Network or server error");
  }
};

// ------------------- DELETE USER (Admin) ------------------- //
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token"); // get current admin token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // send token in headers
      },
    };

    const { data } = await API.delete(`/auth/user/${userId}`, config);
    return data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Network or server error");
  }
};
