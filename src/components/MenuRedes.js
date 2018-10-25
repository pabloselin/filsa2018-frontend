import React, { Component } from "react";
import { Button, Icon, Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButtons = styled(Button.Group)`
	&&& {
		position: fixed;
		right: 0;
		top: 120px;
		border-radius: 4px 0 0 4px;
		background-color: white;
		margin: 0;
		z-index: 100;
	}
`;

const MapButton = styled(Button)`
	&&&&& {
		position: fixed;
		right: 0;
		margin: 0;
		top: 60px;
		border-radius: 4px 0 0 4px;
		background-color: white !important;
		z-index: 100;
	}
`;

const BookButton = styled(Button)`
	&&&&& {
		position: fixed;
		right: 0;
		margin: 0;
		top: 360px;
		border-radius: 4px 0 0 4px;
		background-color: white !important;
		z-index: 100;
	}
`;

class MenuRedes extends Component {
	render() {
		return (
			<Responsive minWidth={769}>
				<MapButton
					title="Ver Mapa (en una ventana aparte)"
					icon
					basic
					size="big"
					as="a"
					target="_blank"
					href="https://www.google.com/maps?ll=-33.432205,-70.654367&z=15&t=m&hl=es-ES&gl=CL&mapclient=embed&cid=12055570873180199757"
				>
					<Icon name="map marker" />
				</MapButton>
				<StyledButtons icon vertical size="big" basic>
					<Button
						name="facebook"
						as="a"
						href={`https://facebook.com/${this.props.facebook}`}
						title="Facebook"
						target="_blank"
					>
						<Icon name="facebook" />
					</Button>
					<Button
						name="twitter"
						as="a"
						href={`https://twitter.com/${this.props.twitter}`}
						title="Twitter"
						target="_blank"
					>
						<Icon name="twitter" />
					</Button>
					<Button
						name="instagram"
						as="a"
						href={`https://instagram.com/${this.props.instagram}`}
						title="Instagram"
						target="_blank"
					>
						<Icon name="instagram" />
					</Button>
					<Button
						name="youtube"
						as="a"
						href={this.props.youtube}
						title="Canal de Youtube"
						target="_blank"
					>
						<Icon name="youtube" />
					</Button>
					<Button
						name="flickr"
						as="a"
						href={this.props.flickr}
						title="Flickr"
						target="_blank"
					>
						<Icon name="flickr" />
					</Button>
				</StyledButtons>

				<BookButton
					icon
					basic
					size="big"
					name="book"
					as={Link}
					to="/encuentra-tu-libro/"
					title="Encuentra tu libro en FILSA 2018"
				>
					<Icon name="book" />
				</BookButton>
			</Responsive>
		);
	}
}

export default MenuRedes;
