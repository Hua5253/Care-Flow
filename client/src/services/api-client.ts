import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://18.222.46.211/api' : "http://localhost:4000",
  withCredentials: true
});
