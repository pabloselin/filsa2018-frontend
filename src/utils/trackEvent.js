import ReactGA from "react-ga";
import config from "../config.json";
import env from "./env";

function trackEvent(status) {
	let node_env = env();
	if (node_env === "development") {
		ReactGA.initialize(config[node_env].google_analytics_ua, {
			testMode: true,
			debug: true
		});
	} else {
		ReactGA.initialize(config[node_env].google_analytics_ua);
	}
	if (status === "dismissed") {
		ReactGA.event({
			category: "PWA",
			action: "Usuario descartó añadir la aplicación a Home"
		});
	} else {
		ReactGA.event({
			category: "PWA",
			action: "Usuario agregó aplicación a Home"
		});
	}
}

export default trackEvent;
