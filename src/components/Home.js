import React, { Component, Fragment } from "react";
import { Container, Header, Grid } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import ReactGA from "react-ga";
import api from "../utils/api.js";

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
			fetched: false,
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

	componentDidMount() {
		this.trackPage(this.props.location.pathname);

		api.get("/filsa2018/v1/options/filsa2018_intro")
			.then(res => {
				this.setState({
					content: res.data
				});
			})
			.catch(error => {
				console.log(error);
			});

		api.get("/filsa2018/v1/options/filsa2018_title")
			.then(res => {
				this.setState({
					fetched: true,
					title: res.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	renderNoticias() {
		let noticias;
		if (this.props.noticias !== null) {
			noticias = (
				<Grid columns={3} divided stackable>
					<Grid.Row>
						{this.props.noticias.map(noticia => (
							<Noticia
								key={noticia.ID}
								id={noticia.object_id}
								title={noticia.title}
								url={noticia.url}
							/>
						))}
					</Grid.Row>
				</Grid>
			);
		}

		return noticias;
	}

	renderContent() {
		let content;
		if (this.state.fetched === true) {
			content = (
				<Fragment>
					<Container text className="maincontent">
						<Title as="h1">{this.state.title}</Title>
						<MainContentText className="maincontent-text">
							{ReactHtmlParser(this.state.content)}
						</MainContentText>
					</Container>
				</Fragment>
			);
		}

		return content;
	}

	render() {
		return (
			<div>
				{this.renderContent()}
				{this.renderNoticias()}
			</div>
		);
	}
}

export default Home;
