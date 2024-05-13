import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://3.142.237.164:4000' : "http://localhost:4000",
  withCredentials: true
});
