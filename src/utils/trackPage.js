import ReactGA from "react-ga";
import config from "../config.json";

function trackPage(path, title) {
	let node_env = window.env || "development";
	let page = config[node_env].basename + path;

	ReactGA.set({
			page
		});
	ReactGA.pageview(page, [], title);
}

export default trackPage;