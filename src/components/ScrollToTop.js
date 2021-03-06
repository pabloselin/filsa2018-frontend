import { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {

	componentDidUpdate(prevProps) {
		if(this.props.location !== prevProps.location) {
			window.scrollTo(0, this.props.top);
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);