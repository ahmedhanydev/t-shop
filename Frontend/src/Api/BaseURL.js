import axios from "axios";

// Override with REACT_APP_API_URL in .env.local to target a local backend
// (e.g. http://127.0.0.1:8000). Defaults to the deployed API.
const baseURL = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://t-shop-api-v1.onrender.com",
});

export default baseURL;
