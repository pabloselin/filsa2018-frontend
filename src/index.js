import React from "react";
import ReactDOM from "react-dom";
import "./assets/semantic/semantic.min.css";
import "./assets/wp.css"

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
//Register service worker only for logged in users
if(window.loggedin !== true) {
	registerServiceWorker();
}
