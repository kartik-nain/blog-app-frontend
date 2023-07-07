import axios from "axios";

const ApiClient = axios.create({
  baseURL: "https://apricot-squid-hem.cyclic.app/",
  // baseURL: "http://localhost:3000/",
});

export default ApiClient;
