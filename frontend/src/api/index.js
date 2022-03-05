import axios from "axios";

//movies api
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

