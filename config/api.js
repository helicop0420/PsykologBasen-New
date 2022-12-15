import axios from "axios";


// const baseUrl = process.env.REACT_APP_API_URL;

const baseUrl = "http://localhost:7777/";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  let user = JSON.parse(localStorage.getItem("psbUser"));
  if (user) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default api;
