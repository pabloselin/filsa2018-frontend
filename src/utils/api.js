import axios from "axios";
import config from "../config.json";
import env from "./env";

const node_env = env();

export default axios.create({
  baseURL: config[node_env].api_url
});
