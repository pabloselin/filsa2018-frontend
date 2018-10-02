import React, { Component, Fragment } from "react";
import { Container, Grid, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import trackPage from "../utils/trackPage";
import SocialHome from "./SocialHome";
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

const NewsImage = styled.img`
	max-width: 100%;
`;

const NewsHeading = styled.h1`
	color: #333;
	padding: 24px 24px 0 12px;
	font-size: 34px;
	@media only screen and (max-width: 768px) {
		font-size: 24px;
	}
`;

const NewsGrid = styled(Grid)`
	&&& {
		margin: 12px 0 24px 0;
		@media only screen and (min-width: 1200px) {
			margin: 24px 0 24px 0;
			border: 1px solid #ccc;
		}
	}
`;

const SimpleRow = styled(Grid.Row)`
	&&& {
		padding: 12px 0 12px 0;
		text-align:center;
	}
`;

const NewsRow = styled(Grid.Row)`
	&&& {
		padding: 0;
	}
`;

const ImageColumn = styled(Grid.Column)`
&&&&& {
	padding: 0;
	line-height: 0;
}`

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
		trackPage(this.props.location.pathname);
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
						<Fragment>
						<NewsGrid padded="vertically">
							<NewsRow
								as={Link}
								to={`/noticias/${
									this.state.firstNoticia.content.slug
								}/`}
							>
								<ImageColumn computer={6} mobile={16}>
									<NewsImage
										src={
											this.state.firstNoticia.content
												.media.medium_large
										}
										alt={this.state.firstNoticia.title}
									/>
								</ImageColumn>
								<Grid.Column
									computer={10}
									mobile={16}
									floated="right"
								>
									<NewsHeading>
										{this.state.firstNoticia.title}
									</NewsHeading>
								</Grid.Column>
							</NewsRow>
						</NewsGrid>
						<Grid padded="vertically">
							<SimpleRow>
								<Grid.Column>
									<Button
										color="red"
										animated
										as={Link}
										to={`/noticias/`}
									>
										<Button.Content visible>
											<Icon name="plus" /> noticias
										</Button.Content>
										<Button.Content hidden>
											<Icon name="arrow right" />
										</Button.Content>
									</Button>
								</Grid.Column>
							</SimpleRow>
						</Grid>
						</Fragment>
					) : null}
					<SocialHome
						twitter={this.props.twitter}
						instagrampost={this.props.instagrampost}
						instagram={this.props.instagram}
						facebook={this.props.facebook}
						facebookid={this.props.facebookid}
					/>
				</MainContainer>
			</div>
		);
	}
}

export default Home;
