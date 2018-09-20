import ReactGA from "react-ga";
import config from "../config.json";

function trackPage(path, title) {
	let page = config[process.env.NODE_ENV].basename + path;

	ReactGA.set({
			page
		});
	ReactGA.pageview(page, [], title);
}

export default trackPage;