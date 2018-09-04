import React, { Component, Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import api from "../utils/api.js";

class Default extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: null,
			title: null,
			nopost: null
		};
	}

	componentDidMount() {
		api.get("/wp/v2/filsa-2018/" + this.props.id).then(res => {
			this.setState({
				title: res.data.title.rendered,
				content: res.data.content.rendered
			});
		})
		.catch(error => {
			this.setState({nopost: true});
		});
	}

	renderContent() {
		let content;
		if (this.state.title !== null) {
			content = (
				<Fragment>
					<Container text className="maincontent">
						<Header as="h1">{this.state.title}</Header>
						<div className="maincontent-text">
							{ReactHtmlParser(this.state.content)}
						</div>
					</Container>
					<style>
						{`
						h1.ui.header:first-child {
							margin-top: 24px;
						}

						.maincontent img {
							max-width: 100%; 
						}

						.maincontent-text {
							margin-bottom: 36px;
						}
					`}
					</style>
				</Fragment>
			);
		}

		return content;
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default Default;
