import React, { Component } from "react";
import { Button, Icon, Responsive } from "semantic-ui-react";
import styled from "styled-components";

const StyledButtons = styled(Button.Group)`
	&&& {
		position: fixed;
		right: 0;
		top: 120px;
		border-radius: 4px 0 0 4px;
	}
`;

const FlickrButton = styled(Button)`
	&& {
		background-color: #0063dc;
		color: white;
		&:hover {
			background-color: #0063dc;
			color: white;
		}
	}
`;

const InstagramButton = styled(Button)`
	&& {
		background: radial-gradient(
			circle at 30% 107%,
			#fdf497 0%,
			#fdf497 5%,
			#fd5949 45%,
			#d6249f 60%,
			#285aeb 90%
		);
		&:hover {
			background: radial-gradient(
				circle at 30% 107%,
				#fdf497 0%,
				#fdf497 5%,
				#fd5949 45%,
				#d6249f 60%,
				#285aeb 90%
			);
			color: white;
		}
		color: white;
	}
`;

class MenuRedes extends Component {
	render() {
		return (
			<Responsive {...Responsive.OnlyComputer}>
				<StyledButtons icon vertical size="large">
					<Button
						name="facebook"
						color="facebook"
						as="a"
						href={this.props.facebook}
					>
						<Icon name="facebook" />
					</Button>
					<Button
						name="twitter"
						color="twitter"
						as="a"
						href={this.props.twitter}
					>
						<Icon name="twitter" />
					</Button>
					<InstagramButton
						name="instagram"
						as="a"
						href={this.props.instagram}
					>
						<Icon name="instagram" />
					</InstagramButton>
					<FlickrButton name="flickr" as="a" href={this.props.flickr}>
						<Icon name="flickr" />
					</FlickrButton>
				</StyledButtons>
			</Responsive>
		);
	}
}

export default MenuRedes;
