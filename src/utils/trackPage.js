import ReactGA from "react-ga";
import config from "../config.json";
import env from "./env";

function trackPage(path, title) {
	let node_env = env();
	let page = config[node_env].basename + path;

	ReactGA.set({
			page
		});
	ReactGA.pageview(page, [], title);
}

export default trackPage;