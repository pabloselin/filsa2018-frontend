import React from "react";
import ReactDOM from "react-dom";
import "./assets/semantic/semantic.min.css";
import "./assets/biblioteca/stylesheet.css";
import "./assets/wp.css"

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
