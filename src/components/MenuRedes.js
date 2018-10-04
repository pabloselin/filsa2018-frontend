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

class MenuRedes extends Component {
	render() {
		return (
			<Responsive {...Responsive.OnlyComputer}>
				<StyledButtons icon vertical size="large">
					<Button
						name="facebook"
						as="a"
						href={this.props.facebook}
					>
						<Icon name="facebook" />
					</Button>
					<Button
						name="twitter"
						as="a"
						href={this.props.twitter}
					>
						<Icon name="twitter" />
					</Button>
					<Button
						name="instagram"
						as="a"
						href={this.props.instagram}
					>
						<Icon name="instagram" />
					</Button>
					<Button name="flickr" as="a" href={this.props.flickr}>
						<Icon name="flickr" />
					</Button>
				</StyledButtons>
			</Responsive>
		);
	}
}

export default MenuRedes;
