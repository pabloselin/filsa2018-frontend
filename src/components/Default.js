import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import Helmet from "react-helmet";
import trackPage from "../utils/trackPage";
import scrollToElement from 'scroll-to-element';
import styled from "styled-components";
import editUrl from "../utils/editUrl";
import SocialButtons from "./SocialButtons";
import SocialHome from "./SocialHome";
import Programa from "./Programa";
import Invitados from "./Invitados";
import BuscaExpositores from "./BuscaExpositores";
import VisitasGuiadas from "./VisitasGuiadas";
import BuscaLibros from "./BuscaLibros";
import ArchivoNoticias from "./ArchiveNoticias";
import Colaboradores from "./Colaboradores";
import Jornadas from "./Jornadas";
import Galeria from "./Galeria";

const Title = styled.h1`
	margin-top: 24px !important;
	color: #cc1011;
	@media screen and (max-width: 768px) {
		font-size: 24px;
	}
`;

const StyledContainer = styled(Container)`
	@media only screen and (min-width: 1213px) {
		&&&.visitas-guiadas {
			width: 950px;
		}
	}
`;

const MainContentText = styled.div`
	margin-bottom: 36px;
	font-size: 18px;
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
		font-size: 16px;
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
		trackPage(this.props.location.pathname, this.props.seotitle);
		this.jumpToHash();
	}

	 jumpToHash = () => {
    const hash = this.props.location.hash;
    if (hash) {
      scrollToElement(hash, { offset: 0 });
    	}
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
		this.jumpToHash();
	}

	returnComponentOption() {
		if (this.state.params !== null) {
			const componentoption = this.props.component;
			switch (componentoption) {
				case "expositores":
					return <BuscaExpositores />;
				case "programa":
					return <Programa />;
				case "jornadas":
					return <Jornadas />;
				case "invitados":
					return <Invitados invitados={this.props.extrafields} />;
				case "visitas-guiadas":
					return <VisitasGuiadas />;
				case "buscalibros":
					return <BuscaLibros />;
				case "colaboradores":
					return (
						<Colaboradores colaboradores={this.props.extrafields} />
					);
				case "archivonoticias":
					return (
						<ArchivoNoticias
							noticias={this.props.params.filsa2018_noticias}
						/>
					);
				case "redes":
					return (
						<Container>
							<SocialHome
								twitter={this.props.params.filsa2018_twitter}
								instagrampost={
									this.props.params.filsa2018_instagrampost
								}
								instagram={
									this.props.params.filsa2018_instagram
								}
								facebook={this.props.params.filsa2018_facebook}
								facebookid={
									this.props.params.filsa2018_facebookid
								}
								youtube={this.props.params.filsa2018_youtube}
								flickr={this.props.params.filsa2018_flickr}
							/>
						</Container>
					);
				case "galeria":
					return <Galeria items={this.props.extrafields} />;
				default:
					return null;
			}
		}
	}

	render() {
		const text = this.props.component !== "normal" ? false : true;
		return (
			<Fragment>
				<Helmet>
					<title>{this.props.seotitle}</title>
				</Helmet>
				<StyledContainer
					text={text}
					className={`maincontent ${this.props.component}`}
				>
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
				</StyledContainer>
				{this.returnComponentOption()}
			</Fragment>
		);
	}
}

export default Default;
