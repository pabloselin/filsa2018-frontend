import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import SocialButtons from "./SocialButtons";
import editUrl from "../utils/editUrl";
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
		text-transform:uppercase;
		@media screen and (max-width: 768px) {
			font-size: 24px;
		}
	}
`;

const EditLink = styled.a`
	font-family: sans-serif;
	font-size: 13px;
	display: inline-block;
	margin-left: 6px;
	font-weight: normal;
`

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

	editLink() {
		let editlink;
		if(window.loggedin === true) {
			editlink = <EditLink href={editUrl(this.props.id)}>[Editar]</EditLink>
		}
		return editlink;
	}

	render() {
		return (
			<Container text>
				<Helmet>
					<title>{this.props.title}</title>
				</Helmet>
				<Title>{this.props.title}{this.editLink()}</Title>
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
