import React, { Component } from "react";
import {
	Menu,
	Responsive,
	Container,
	Icon,
	Transition
} from "semantic-ui-react";
import styled from "styled-components";
import { menuItems } from "./menuItems";

const StyledMenu = styled(Menu)`
	&&&&& {
		border-radius: 0;
		margin-bottom: 0;
		margin-top: 0;
		> container {
			flex-wrap: wrap;
		}
	}
`;

const StyledSecondMenu = styled(Menu)`
	&&&&& {
		border-radius: 0;
		margin-bottom: 0;
		margin-top: 0;
		border-top: 1px solid #555;
		> container {
			flex-wrap: wrap;
		}
	}
`;

const PlusMenu = styled(Menu.Item)`
	&&&&&&& {
		background-color: #db2828;
		color: white;
	}
`;

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
				<StyledMenu inverted>
					<Container>
						{menuItems(this.props.menuitems, true)}
						<Menu.Menu position="right">
							<PlusMenu onClick={this.toggleSecondary}>
								{this.state.toggleSecondary === true ? (
									<Icon name="close" />
								) : (
									<Icon name="plus" />
								)}
							</PlusMenu>
						</Menu.Menu>
					</Container>
				</StyledMenu>
				<Transition.Group animation="fade down" duration={500}>
					{this.state.toggleSecondary && (
						<StyledSecondMenu inverted animation="overlay">
							<Container>
								{menuItems(this.props.secondmenuitems, false)}
							</Container>
						</StyledSecondMenu>
					)}
				</Transition.Group>
			</Responsive>
		);
	}
}

export default MenuTop;
