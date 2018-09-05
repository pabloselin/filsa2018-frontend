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
			fetched: false,
			content: null,
			title: null
		};
	}

	componentDidMount() {
		if(this.props.type === 'filsa-2018') {
			api.get("/wp/v2/filsa-2018/" + this.props.id).then(res => {
				this.setState({
					fetched: true,
					title: res.data.title.rendered,
					content: res.data.content.rendered
				});
			})
			.catch(error => {
				console.log(error);
			});
		}
	}

	renderContent() {
		let content;
		if (this.state.fetched === true) {
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