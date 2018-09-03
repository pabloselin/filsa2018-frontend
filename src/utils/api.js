import axios from "axios";
import config from "../config.json";

export default axios.create({
  baseURL: config['api_url.' + process.env.NODE_ENV]
});
