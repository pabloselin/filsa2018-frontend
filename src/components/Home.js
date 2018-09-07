import React, { Component } from "react";
import { Container, Header, Grid } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import ReactGA from "react-ga";
import queryString from "../vendor/query-string/index.js";
import Noticia from "./Noticia";

const Title = styled(Header)`
	margin-top: 24px !important;
`;

const MainContentText = styled.div`
	margin-bottom: 36px;

	img {
		max-width: 100%;
		height: auto;
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

	trackPage(page) {
		ReactGA.set({
			page
		});
		ReactGA.pageview(page);
	}

	refineSlugFromQuery(slug) {
		let parsed = queryString.parse(slug);
		return parsed.noticia;
	}

	componentDidMount() {
		if (this.props.location.search.length > 0) {
			let slug = this.refineSlugFromQuery(this.props.location.search);
			this.props.history.push(
				"/ferias/filsa/filsa-2018/noticias/" + slug + "/"
			);
			//console.log(slug);
		}
		this.trackPage(this.props.location.pathname);
	}

	matchNews(postID) {
		let match;
		this.props.noticias_content.map(noticia => {
			if (noticia.id === postID) {
				match = noticia;
			}
		});

		return match;
	}

	renderNoticias() {
		let noticias;
		if (this.props.noticias !== null && this.props.noticias_content !== null) {
			noticias = (
				<Grid columns={3} divided stackable>
					<Grid.Row>
						{this.props.noticias.map(noticia => {
							let content = this.matchNews(parseInt(noticia.object_id, 10));
							if(content !== undefined) {
								return (
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
				<Container text className="maincontent">
					<Title as="h1">{this.props.title}</Title>
					<MainContentText className="maincontent-text">
						{ReactHtmlParser(this.props.content)}
					</MainContentText>
				</Container>
				{this.renderNoticias()}
			</div>
		);
	}
}

export default Home;
