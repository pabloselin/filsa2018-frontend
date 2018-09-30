import React, { Component } from "react";
import { Container, Grid, Button, Icon, Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import FacebookProvider, { Page } from "react-facebook";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";
import trackPage from "../utils/trackPage";
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
	a {
		color: #333;
	}
	@media only screen and (max-width: 768px) {
		font-size: 24px;
	}
`;

const NewsGrid = styled(Grid)`
	&&& {
		margin: 12px 0;
		@media only screen and (min-width: 1200px) {
			margin: 24px 0 24px 0;
		}
	}
`;

const SocialButton = styled(Button)`
	&&& {
		margin-bottom: 12px;
	}
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
						<NewsGrid padded="vertical">
							<Grid.Row>
								<Grid.Column computer={6} mobile={16}>
									<Link
											to={`/noticias/${
												this.state.firstNoticia.content
													.slug
											}/`}
										>
									<NewsImage
										src={
											this.state.firstNoticia.content
												.media.medium_large
										}
										alt={this.state.firstNoticia.title}
									/>
									</Link>
								</Grid.Column>
								<Grid.Column
									computer={10}
									mobile={16}
									floated="right"
								>
									<NewsHeading>
										<Link
											to={`/noticias/${
												this.state.firstNoticia.content
													.slug
											}/`}
										>
											{this.state.firstNoticia.title}
										</Link>
									</NewsHeading>
									<div>
										{
											this.state.firstNoticia.content
												.excerpt
										}
									</div>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<Button
										color="red"
										animated
										floated="right"
										as={Link}
										to="/noticias/"
									>
										<Button.Content visible>
											<Icon name="plus" /> noticias
										</Button.Content>
										<Button.Content hidden>
											<Icon name="arrow right" />
										</Button.Content>
									</Button>
								</Grid.Column>
							</Grid.Row>
						</NewsGrid>
					) : null}

					<Responsive minWidth={769}>
						<Grid columns={3} padded="vertical">
							<Grid.Column>
								<FacebookProvider appId="1048728495191929">
									<Page
										href="https://www.facebook.com/filsachile"
										tabs="timeline"
										height={563}
									/>
								</FacebookProvider>
							</Grid.Column>
							<Grid.Column>
								<TwitterTimelineEmbed
									sourceType="profile"
									screenName="camaradellibro"
									options={{ height: 563 }}
								/>
							</Grid.Column>
							<Grid.Column>
								<InstagramEmbed
									url="https://www.instagram.com/p/BnmOGArl7_t/"
									hideCaption={true}
								/>
							</Grid.Column>
						</Grid>
					</Responsive>
					<Responsive {...Responsive.onlyMobile}>
						<SocialButton
							target="_blank"
							fluid
							color="purple"
							as={Link}
							to="https://www.instagram.com"
						>
							<Icon name="instagram" /> Instagram
						</SocialButton>
						<SocialButton
							target="_blank"
							fluid
							color="facebook"
							as={Link}
							to="https://www.instagram.com"
						>
							<Icon name="facebook" /> Facebook
						</SocialButton>
						<SocialButton
							target="_blank"
							fluid
							color="twitter"
							as={Link}
							to="https://www.instagram.com"
						>
							<Icon name="twitter" /> Twitter
						</SocialButton>
					</Responsive>
				</MainContainer>
			</div>
		);
	}
}

export default Home;
