import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Failed to fetch user profile"
    );
  }
};

export default axiosInstance;
