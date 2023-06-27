import axios from "axios";

const ApiClient = axios.create({
  baseURL: "https://apricot-squid-hem.cyclic.app/",
});

export default ApiClient;
