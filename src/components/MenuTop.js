import React, { Component } from "react";
import { Menu, Responsive, Icon, Container } from "semantic-ui-react";
import styled from "styled-components";
import { menuItems } from "./menuItems";

const StyledMenu = styled(Menu)`
	&&&&& {
		border-radius: 0;
	}
`;

class MenuTop extends Component {
	render() {
		return (
			<Responsive minWidth={769}>
				<StyledMenu inverted>
					<Container>
						{menuItems(this.props.menuitems)}
					</Container>
				</StyledMenu>
			</Responsive>
		);
	}
}

export default MenuTop;
