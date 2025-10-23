import axios from "axios";

const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', 
    headers: {
        "Accept": "application/json"
    }
});

http.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token-bebas");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default http;