import axios from "axios";
import config from "../config.json";

const node_env = window.env || "development";

export default axios.create({
  baseURL: config[node_env].api_url
});
