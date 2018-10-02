import config from "../config";
import env from "./env";

function editUrl(id) {
	let node_env = env();
	return `${config[node_env].wpadmin_url}/post.php?post=${id}&action=edit`;
}

export default editUrl;