import axios from "axios";
import config from "../config.json";

const node_env = process.env.NODE_ENV;

export default axios.create({
  baseURL: config[node_env].api_url
});
