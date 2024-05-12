import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://care-flow-2024-f862ac6aef16.herokuapp.com/' : "http://localhost:4000",
  withCredentials: true
});
