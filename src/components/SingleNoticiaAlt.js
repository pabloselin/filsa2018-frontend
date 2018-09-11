import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import SocialButtons from "./SocialButtons";
import ReactGA from "react-ga";
import styled from "styled-components";
import Helmet from "react-helmet";

const TextContent = styled.div`
	margin-bottom: 48px;
	img {
		max-width: 100%;
	}
`;

const Title = styled.h1`
	&& {
		margin-top: 24px;
		color: #42413f;
	}
`;

class SingleNoticiaAlt extends Component {
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
			<Container text>
				<Helmet>
					<title>{this.props.title}</title>
				</Helmet>
				<Title>{this.props.title}</Title>
				<SocialButtons title={this.props.title} url={this.props.location.pathname} />
				<TextContent>
					<img
						src={this.props.media.imagen_single}
						alt={this.props.title}
					/>
					{ReactHtmlParser(this.props.content)}
				</TextContent>
			</Container>
		);
	}
}

export default SingleNoticiaAlt;
