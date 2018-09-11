import React, { Component } from "react";
import api from "../utils/api";

class Invitados extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventos: null
		};
	}

	componentDidMount() {
		api.get("/filsa2018/v1/events/").then(res => {
			this.setState({
				events: res.data
			});
		});
	}

	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
			</div>
		);
	}
}

export default Invitados;
