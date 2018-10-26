import React, { Component } from "react";
import { Container, Grid, Divider, Responsive } from "semantic-ui-react";
import Helmet from "react-helmet";
import trackPage from "../utils/trackPage";
import SocialHome from "./SocialHome";
import FirstNoticia from "./FirstNoticia";
import HomeEventos from "./HomeEventos";
import ColaboradoresWidget from "./ColaboradoresWidget";
import BuscaLibrosMini from "./BuscaLibrosMini";
import BuscaExpositoresMini from "./BuscaExpositoresMini";
import styled from "styled-components";
import Noticia from "./Noticia";

const MainContainer = styled(Container)`
	&& {
		@media only screen and (min-width: 1200px) {
			width: 1140px;
			margin-top: 32px;
		}
	}
`;

const StyledSocialSection = styled.div`
	background-color: #f0f0f0;
	padding: 24px 0;
`;

const StyledSearchSection = styled.div`
	background-color: #fafafa;
	padding: 24px 0;
	border-bottom: 1px solid #d9d2c4;
	border-top: 1px solid #d9d2c4;
`;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: null,
			title: null,
			noticias: null,
			firstNoticia: null
		};
	}

	componentDidMount() {
		trackPage(this.props.location.pathname, this.props.title);
		this.primeraNoticia();
	}

	matchNews(postID) {
		let matched;
		this.props.noticias_content.map(noticia => {
			if (noticia.id === postID) {
				matched = noticia;
			}
			return matched;
		});
		return matched;
	}

	primeraNoticia() {
		let first;
		if (
			this.props.noticias !== undefined &&
			this.props.noticias_content !== undefined
		) {
			first = this.props.noticias[0];
			let content = this.matchNews(parseInt(first.object_id, 10));
			if (content !== undefined) {
				this.setState({
					firstNoticia: { title: first.title, content: content }
				});
			}
		}
	}

	renderNoticias() {
		let noticias;
		if (
			this.props.noticias !== undefined &&
			this.props.noticias_content !== undefined
		) {
			noticias = (
				<Grid columns={3} divided stackable>
					<Grid.Row>
						{this.props.noticias.map(noticia => {
							let content = this.matchNews(
								parseInt(noticia.object_id, 10)
							);
							let noticiacomponent;
							if (content !== undefined) {
								noticiacomponent = (
									<Noticia
										key={noticia.ID}
										id={noticia.object_id}
										title={noticia.title}
										link={"/noticias/" + content.slug + "/"}
										slug={content.slug}
										media={content.media}
										content={content.content}
										date={content.date}
									/>
								);
							}
							return noticiacomponent;
						})}
					</Grid.Row>
				</Grid>
			);
		}

		return noticias;
	}

	render() {
		return (
			<div>
				<Helmet>
					<title>{this.props.title}</title>
				</Helmet>
				<MainContainer>
					{this.state.firstNoticia !== null ? (
						<FirstNoticia noticia={this.state.firstNoticia} />
					) : null}
					<Divider hidden />
				</MainContainer>
				<Divider hidden />
				<StyledSearchSection>
					<Container>
						<HomeEventos eventos={this.props.eventos} />
						<Divider hidden />
						<Grid doubling columns={2}>
							<Grid.Column>
								<BuscaLibrosMini />
							</Grid.Column>
							<Grid.Column>
								<BuscaExpositoresMini />
							</Grid.Column>
						</Grid>
					</Container>
				</StyledSearchSection>
				<StyledSocialSection>
					<Container>
						<SocialHome
							twitter={this.props.twitter}
							instagrampost={this.props.instagrampost}
							instagram={this.props.instagram}
							facebook={this.props.facebook}
							facebookid={this.props.facebookid}
							youtube={this.props.youtube}
							flickr={this.props.flickr}
						/>
					</Container>
				</StyledSocialSection>
				<Responsive {...Responsive.onlyComputer}>
					{this.props.colaboradores && (
						<ColaboradoresWidget
							colaboradores={this.props.colaboradores}
						/>
					)}
				</Responsive>
			</div>
		);
	}
}

export default Home;
