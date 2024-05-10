import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backrecrez.bbros.al",
  // baseURL: "http://192.168.0.229",
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log("Error retriving token", error);
  }
  return config;
});
export default axiosInstance;
