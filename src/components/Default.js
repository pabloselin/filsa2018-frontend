import React, { Component, Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import Helmet from "react-helmet";
import ReactGA from "react-ga";
import styled from "styled-components";

const Title = styled(Header)`
	margin-top: 24px !important;
`;

const MainContentText = styled.div`
	margin-bottom: 36px;

	img {
		max-width: 100%;
		height: auto;
	}
`;

class Default extends Component {
	trackPage(page) {
		ReactGA.set({
			page
		});
		ReactGA.pageview(page);
	}

	componentDidMount() {
		this.trackPage(this.props.location.pathname);
	}

	render() {
		return (
			<Fragment>
				<Helmet>
					<title>{this.props.title}</title>
				</Helmet>
				<Container text className="maincontent">
					<Title as="h1">{this.props.title}</Title>
					<MainContentText className="maincontent-text">
						{ReactHtmlParser(this.props.content)}
					</MainContentText>
				</Container>
			</Fragment>
		);
	}
}

export default Default;
