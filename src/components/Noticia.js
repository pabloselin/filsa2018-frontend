import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../utils/api";

class Noticia extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: null,
			slug: null
		};
	}

	componentDidMount() {
		this.fetchImage(this.props.id);
	}

	fetchImage(postID) {
		api.get(`/better-rest-endpoints/v1/post/${postID}`).then(res => {
			this.setState({ img: res.data.media.imagen_single, slug: res.data.slug });
		});
	}

	renderImg() {
		let img;
		if (this.state.img !== null) {
			img = <img src={this.state.img} alt={this.props.title} />;
		}

		return img;
	}

	renderLink() {
		let link;
		if(this.state.slug !== null) {
			link = <Header as="h3">
					<Link
						to={"/ferias/filsa/filsa-2018/noticias/" + this.state.slug}
						onClick={this.openLink}
					>
						{this.props.title}
					</Link>
				</Header>
		}
		return link;
	}

	render() {
		return (
			<Grid.Column className="noticia">
				{this.renderImg()}
				{this.renderLink()}
			</Grid.Column>
		);
	}
}

export default Noticia;
