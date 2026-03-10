import axios from "axios";

const API = axios.create({
  baseURL: "https://werner-desertic-lorinda.ngrok-free.dev",
});

export default API;
