import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-managment-axcg.onrender.com/api", 
  withCredentials: true, 
});

export default api;
