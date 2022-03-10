import axios from "axios";

//backend api
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});
export const axiosAuthInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization: localStorage.getItem("token")
      ? `Token ${localStorage.getItem("token")}`
      : "",
  },
});
