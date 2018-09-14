import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.h3`
	margin-top: 0;
	font-size: 24px;
	a {
		color: rgba(0,0,0,.87);
	}
`

const Image = styled.img`
	max-width: 100%;
	height: auto;
`

class Noticia extends Component {
	render() {
		return (
			<Grid.Column className="noticia">
				<Image src={this.props.media.imagen_single} alt={this.props.title}/>
				<StyledHeader>
					<Link
						to={ this.props.link }
					>
						{this.props.title}
					</Link>
				</StyledHeader>
			</Grid.Column>
		);
	}
}

export default Noticia;
