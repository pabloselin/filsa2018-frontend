import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import Helmet from "react-helmet";
import trackPage from "../utils/trackPage";
import styled from "styled-components";
import editUrl from "../utils/editUrl";
import SocialButtons from "./SocialButtons";
import Programa from "./Programa";
import Invitados from "./Invitados";
import VisitasGuiadas from "./VisitasGuiadas";
import BuscaLibros from "./BuscaLibros";
import ArchivoNoticias from "./ArchiveNoticias";

const Title = styled.h1`
	margin-top: 24px !important;
	color: #cc1011;
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

	@media screen and (max-width: 768px) {
		h2 {
			font-size: 1.3rem;
		}
		h3 {
			font-size: 1.25rem;
		}
	}
`;

const EditLink = styled.a`
	font-family: sans-serif;
	font-size: 13px;
	display: inline-block;
	margin-left: 6px;
	font-weight: normal;
`;

class Default extends Component {
	constructor(props) {
		super(props);

		this.state = {
			params: this.props.params
		};
	}

	componentDidMount() {
		trackPage(this.props.location.pathname);
	}

	editLink() {
		let editlink;
		if (window.loggedin === true) {
			editlink = (
				<EditLink href={editUrl(this.props.id)}>[Editar]</EditLink>
			);
		}
		return editlink;
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.params !== prevProps.params) {
			this.setState({
				params: this.props.params
			});
		}
	}

	returnComponentOption() {
		if (this.state.params !== null) {
			const componentoption = this.props.component;
			switch (componentoption) {
				case "programa":
					return <Programa />;
				case "invitados":
					return <Invitados />;
				case "visitas-guiadas":
					return <VisitasGuiadas />;
				case "buscalibros":
					return <BuscaLibros />;
				case "archivonoticias":
					return (
						<ArchivoNoticias
							noticias={this.props.params.filsa2018_noticias}
						/>
					);
				default:
					return null;
			}
		}
	}

	render() {
		const text = this.props.component !== 'normal' ? false : true;
		return (
			<Fragment>
				<Helmet>
					<title>{this.props.title}</title>
				</Helmet>
				<Container text={text} className="maincontent">
					<Title>
						{this.props.title}
						{this.editLink()}
					</Title>
					<SocialButtons
						title={this.props.title}
						url={this.props.location.pathname}
					/>
					<MainContentText className="maincontent-text">
						{ReactHtmlParser(this.props.content)}
					</MainContentText>
				</Container>
				{this.returnComponentOption()}
			</Fragment>
		);
	}
}

export default Default;
