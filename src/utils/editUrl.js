import config from "../config";

function editUrl(id) {
	return `${config[window.env].wpadmin_url}/post.php?post=${id}&action=edit`;
}

export default editUrl;