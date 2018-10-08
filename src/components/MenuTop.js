import React, { Component } from "react";
import { Menu, Responsive, Container } from "semantic-ui-react";
import styled from "styled-components";
import { menuItems } from "./menuItems";

const StyledMenu = styled(Menu)`
	&&&&& {
		border-radius: 0;
		margin-bottom: 0;
		margin-top: 0;
		> .container {
			border-left: 1px solid #555;
		}
	}
`;

const StyledSecondMenu = styled(Menu)`
	&&&&& {
		border-radius: 0;
		margin-bottom: 0;
		margin-top: 0;
		border-top: 1px solid #555;
		background-color: #393d41;
		> .container {
			border-left: 1px solid #555;
		}
	}
`;

const StyledContainer = styled(Container)`
	&&&&& {
		width: 1140px;
	}
`

class MenuTop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleSecondary: false
		};
		this.toggleSecondary = this.toggleSecondary.bind(this);
	}

	toggleSecondary() {
		this.setState({
			toggleSecondary: this.state.toggleSecondary === true ? false : true
		});
	}

	render() {
		return (
			<Responsive minWidth={769}>
				<StyledMenu
					inverted
					fluid
					widths={Object.keys(this.props.menuitems).length + 1}
				>
					<StyledContainer>
						{menuItems(this.props.menuitems, true)}
					</StyledContainer>
				</StyledMenu>
				<StyledSecondMenu
					inverted
					fluid
					widths={Object.keys(this.props.secondmenuitems).length}
				>
					<StyledContainer>
						{menuItems(this.props.secondmenuitems, false)}
					</StyledContainer>
				</StyledSecondMenu>
			</Responsive>
		);
	}
}

export default MenuTop;
