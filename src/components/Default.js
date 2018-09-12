import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import Helmet from "react-helmet";
import ReactGA from "react-ga";
import styled from "styled-components";
import editUrl from "../utils/editUrl";
import SocialButtons from "./SocialButtons";
import ComponentSelect from "./ComponentSelect";

const Title = styled.h1`
	margin-top: 24px !important;
	text-transform: uppercase;
	@media screen and (max-width: 768px) {
		font-size: 24px;
	}
`;

const MainContentText = styled.div`
	margin-bottom: 36px;

	img {
		max-width: 100%;
		height: auto;
	}
`;

const EditLink = styled.a`
	font-family: sans-serif;
	font-size: 13px;
	display: inline-block;
	margin-left: 6px;
	font-weight: normal;
`

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

	editLink() {
		let editlink;
		if(window.loggedin === true) {
			editlink = <EditLink href={editUrl(this.props.id)}>[Editar]</EditLink>
		}
		return editlink;
	}

	render() {
		const ComponentOption = this.props.component
			? ComponentSelect[this.props.component]
			: null;
		return (
			<Fragment>
				<Helmet>
					<title>{this.props.title}</title>
				</Helmet>
				<Container text className="maincontent">
					<Title>{this.props.title}{this.editLink()}</Title>
					<SocialButtons title={this.props.title} url={this.props.location.pathname} />
					<MainContentText className="maincontent-text">
						{ReactHtmlParser(this.props.content)}
					</MainContentText>
				</Container>
				<Container className="componentcontent">
					{ComponentOption ? <ComponentOption /> : <div />}
				</Container>
			</Fragment>
		);
	}
}

export default Default;
