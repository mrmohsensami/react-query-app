// import store from "../store";

import axios from "axios";
import { setRefreshToken } from "../redux/features/authSlice";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://172.16.41.13:1890/api",
  // timeout: 5000, // Optional timeout value in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token")!);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response?.data?.status === 403) {
      toast.error(response?.data?.status + " " + response?.data?.message);
    }
    if (response?.data?.status === 401 || response?.data?.status === 1068) {
      // if (confirm(response?.data?.message)) {
      localStorage.clear();
      window.location.href = "/";
      // }
    } else if (response?.data?.status === 1079) {
      // if (confirm(response?.data?.message)) {
      try {
        const refreshTokenInLocalStorage = JSON.parse(localStorage.getItem("refreshToken")!);
        const responseRefresh = await axios.post("https://vtap.ir/Company/api/Users/RefreshToken", {
          refreshToken: refreshTokenInLocalStorage,
        });
        // console.log(responseRefresh.data.data.token);
        // localStorage.setItem("token", JSON.stringify(responseRefresh.data.data.token));
        // localStorage.setItem("refreshToken", JSON.stringify(responseRefresh.data.data.refreshToken));
        // window.location.href = "/";
        // console.log(responseRefresh.data.data.token);
        // document.cookie = `token=${responseRefresh.data.data.token}; path=/`;
        store.dispatch(setRefreshToken({ token: responseRefresh.data.data.token, refreshToken: responseRefresh.data.data.refreshToken, userInfo: responseRefresh.data.data.userInfo }));
        window.location.href = "/dashboard";
      } catch (refreshError) {
        // console.log("refreshError" + refreshError);
        // if (confirm(responseRefresh?.data?.message)) {
        localStorage.clear();
        window.location.href = "/";
        // }
      }
      // }
    }
    return response;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
