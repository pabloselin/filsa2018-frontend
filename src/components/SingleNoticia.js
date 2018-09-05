import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import api from "../utils/api";

const TextContent = styled.div`
	margin-bottom: 48px;
	img {
		max-width: 100%;
	}
`

const Title = styled.h1`
	&& {
		margin-top: 24px;
	}
`

class SingleNoticia extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: null,
			slug: null,
			content: null
		};
	}

	componentDidMount() {
		this.fetchPost(this.props.id);
	}

	fetchPost(postID) {
		api.get(`/better-rest-endpoints/v1/post/${postID}`).then(res => {
			this.setState({
				img: res.data.media.imagen_single,
				content: res.data.content
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
		}
		return content;
	}

	render() {
		return (
			<Container text>
				<Title>{this.props.title}</Title>
				{this.renderContent()}
			</Container>
		);
	}
}

export default SingleNoticia;
