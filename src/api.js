import axios from "axios";

const API = axios.create({
  baseURL: "https://api.moneymining.co.in",
});

export default API;
