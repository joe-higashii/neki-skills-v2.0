import axios from "axios";
import { getLocalItem, getSessionItem } from "./storage";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((request) => {
  const storage = getLocalItem("user") || getSessionItem("user");
  if (storage != null) {
    request.headers.Authorization = `Bearer ${storage.token}`;
  }
  return request;
});
