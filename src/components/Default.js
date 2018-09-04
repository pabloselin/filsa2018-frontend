import React, { Component, Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import api from "../utils/api.js";

const Title = styled(Header)`
	margin-top: 24px !important;`

const MainContentText = styled.div`
	margin-bottom: 36px;

	img {
		max-width: 100%;
		height: auto;
	}
`

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
						<Title as="h1">{this.state.title}</Title>
						<MainContentText className="maincontent-text">
							{ReactHtmlParser(this.state.content)}
						</MainContentText>
					</Container>
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
