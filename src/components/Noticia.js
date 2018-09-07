import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Noticia extends Component {
	render() {
		return (
			<Grid.Column className="noticia">
				<img src={this.props.media.imagen_single} alt={this.props.title}/>
				<Header as="h3">
					<Link
						to={ this.props.link }
					>
						{this.props.title}
					</Link>
				</Header>
			</Grid.Column>
		);
	}
}

export default Noticia;
