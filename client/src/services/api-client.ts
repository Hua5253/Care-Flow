import axios from "axios";

export default axios.create({
  // baseURL: 'https://care-flow-2024-5ef1aadf128e.herokuapp.com/'
  baseURL: "http://localhost:4000",
  withCredentials : true
});
