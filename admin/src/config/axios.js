import axios from "axios";

const axiosConfig = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:7002",
});

axiosConfig.defaults.headers.common["x-access-token"] =
  localStorage.getItem("authToken") || "";

export default axiosConfig;
