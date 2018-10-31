import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import SocialButtons from "./SocialButtons";
import Noticia from "./Noticia";
import editUrl from "../utils/editUrl";
import trackPage from "../utils/trackPage";
import styled from "styled-components";
import Helmet from "react-helmet";

const TextContent = styled.div`
	margin-bottom: 48px;
	font-size: 18px;
	img {
		max-width: 100%;
	}
	@media screen and (max-width: 768px) {
		font-size: 16px;
	}
	ul li {
		line-height: 1.35em;
	}
`;

const MainImg = styled.img`
	margin-bottom: 24px;
`;

const Title = styled.h1`
	&& {
		margin-top: 24px;
		color: #cc1011;
		@media screen and (max-width: 768px) {
			font-size: 24px;
		}
	}
`;

const AsideNoticias = styled(Grid.Column)`
	margin-top: 36px;
`;

const EditLink = styled.a`
	font-family: sans-serif;
	font-size: 13px;
	display: inline-block;
	margin-left: 6px;
	font-weight: normal;
`;

const SideNoticia = styled.div`
	margin-bottom: 24px;
	padding-bottom: 24px;
	border-bottom: 1px solid #ccc;
`;

class SingleNoticiaAlt extends Component {
	componentDidMount() {
		trackPage(this.props.location.pathname, this.props.seotitle);
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

	render() {
		return (
			<Container>
				<Grid>
					<Grid.Column mobile={16} computer={10}>
						<Helmet>
							<title>{this.props.seotitle}</title>
						</Helmet>
						<Title>
							{this.props.title}
							{this.editLink()}
						</Title>

						<SocialButtons
							title={this.props.title}
							url={this.props.location.pathname}
						/>
						<TextContent>
							<MainImg
								src={this.props.media.imagen_single}
								alt={this.props.title}
							/>
							{ReactHtmlParser(this.props.content)}
						</TextContent>
					</Grid.Column>
					<AsideNoticias mobile={16} computer={6}>
						<h3>Más noticias</h3>
						{this.props.otras_noticias.map((noticia, key) => (
							<SideNoticia key={key}>
								<Noticia
									title={noticia.title}
									link={"/noticias/" + noticia.slug + "/"}
									slug={noticia.slug}
									media={noticia.media}
									content={noticia.content}
									date={noticia.date}
								/>
							</SideNoticia>
						))}
					</AsideNoticias>
				</Grid>
			</Container>
		);
	}
}

export default SingleNoticiaAlt;
