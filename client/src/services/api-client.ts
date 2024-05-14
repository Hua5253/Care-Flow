import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost/api' : "http://localhost:4000",
  withCredentials: true
});
