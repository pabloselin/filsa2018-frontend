import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import Helmet from "react-helmet";
import SocialButtons from "./SocialButtons";
import trackPage from "../utils/trackPage";
import styled from "styled-components";
import Noticia from "./Noticia";
//import Programa from "./Programa";

const Title = styled.h1`
	margin-top: 24px !important;
	font-size: 42px;
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
`;

const MainContainer = styled(Container)`
  && {
    @media only screen and (min-width: 1200px) {
      width: 1140px;
    }
  }
`;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: null,
			title: null,
			noticias: null
		};
	}


	componentDidMount() {
		trackPage(this.props.location.pathname);
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
				<Container text className="maincontent">	
					<Title as="h1">{this.props.title}</Title>
					<SocialButtons url={this.props.location.pathname} title={this.props.title} />
					<MainContentText className="maincontent-text">
						{ReactHtmlParser(this.props.content)}
					</MainContentText>
				</Container>
				<MainContainer>
				{this.renderNoticias()}
				</MainContainer>
			</div>
		);
	}
}

export default Home;
