import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import ReactGA from "react-ga";
import styled from "styled-components";
import queryString from "../vendor/query-string/index.js";
import api from "../utils/api";

const TextContent = styled.div`
	margin-bottom: 48px;
	img {
		max-width: 100%;
	}
`;

const Title = styled.h1`
	&& {
		margin-top: 24px;
	}
`;

class SingleNoticia extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: null,
			slug: null,
			content: null,
			notfound: false,
			title: this.props.title ? this.props.title : null
		};
	}

	trackPage(page) {
		ReactGA.set({
			page
		});
		ReactGA.pageview(page);
	}

	refineSlug(slug) {
		let split = slug.split("/");
		split = split[split.length - 2];
		return split;
	}

	refineSlugFromQuery(slug) {
		let parsed = queryString.parse(slug);
		console.log(parsed.slug);
		return parsed.slug;
	}

	componentDidMount() {
		this.trackPage(this.props.location.pathname);
		if(this.props.location.search.length > 0) {
			//this.setState({title: this.props.location.search});
			this.fetchPost(this.refineSlugFromQuery(this.props.location.search))
		}
		else if (this.props.id) {
			this.fetchPost(this.props.id);
		} else {
			this.fetchPost(this.refineSlug(this.props.location.pathname));
		}
	}

	fetchPost(postID) {
		api.get(`/better-rest-endpoints/v1/post/${postID}`)
			.then(res => {
				let data = res.data;
				if (data.id !== undefined) {
					this.setState({
						img: res.data.media.imagen_single,
						content: res.data.content,
						title: res.data.title
					});
				} else {
					this.setState({
						notfound: true
					});
				}
			})
			.catch(error => {
				this.setState({
					notfound: true
				});
			});
	}

	renderContent() {
		let content;
		if (this.state.content !== null) {
			content = (
				<TextContent>
					<img src={this.state.img} alt={this.props.title} />
					{ReactHtmlParser(this.state.content)}
				</TextContent>
			);
		} else if (this.state.notfound === true) {
			content = (
				<TextContent>
					<Title>404</Title>
					<p>No encontrado</p>
				</TextContent>
			);
		}

		return content;
	}

	render() {
		return (
			<Container text>
				<Title>{this.state.title}</Title>
				{this.renderContent()}
			</Container>
		);
	}
}

export default SingleNoticia;
