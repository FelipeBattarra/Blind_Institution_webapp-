import { AuthStorageKeys } from "@/enums/local-storage-keys";
import axios from "axios";
import nookies from "nookies";

const api = axios.create({
  baseURL: `http://localhost:8081`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = nookies.get(null)[AuthStorageKeys.Token];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
