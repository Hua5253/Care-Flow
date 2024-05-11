import axios from "axios";

export default axios.create({
  baseURL: 'https://care-flow-2024-f862ac6aef16.herokuapp.com/',
  // baseURL: "http://localhost:4000",
  withCredentials : true
});
