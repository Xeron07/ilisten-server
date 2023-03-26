import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "/",
});

axiosConfig.defaults.headers.common["x-access-token"] =
  localStorage.getItem("authToken") || "";

export default axiosConfig;
