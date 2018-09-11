import config from "../config";

function editUrl(id) {
	return `${config[process.env.NODE_ENV].wpadmin_url}/post.php?post=${id}&action=edit`;
}

export default editUrl;