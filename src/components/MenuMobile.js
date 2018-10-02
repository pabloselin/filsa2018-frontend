import React, { Component } from "react";
import { Button, Menu, Transition, Responsive, Icon } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import MobileMenuItems from "./MobileMenuItems";

const Toggler = styled(Button)`
	&& {
		position: absolute;
		top: 32px;
		left: 0;
		color: white;
		border-radius: 0 5px 5px 0;
		font-size: 24px;
		padding: 12px;
		i {
			margin: 0 !important;
		}
	}
`;

const StyledMenu = styled(Menu)`
	&& {
		border-radius: 0;
		position: absolute;
		z-index: 10;
	}
`;

class MenuMobile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
		this.handleVisibility = this.handleVisibility.bind(this);
	}

	handleVisibility() {
		this.setState({ visible: !this.state.visible });
	}

	componentDidUpdate(prevProps) {
		if(this.props.location !== prevProps.location) {
			this.setState({ visible: false })
		}
	}

	render() {
		const visible = this.state.visible;

		return (
			<Responsive {...Responsive.onlyMobile}>
				<Toggler color="black" onClick={this.handleVisibility}>
					<Icon name="bars" />
				</Toggler>
				<Transition.Group animation="slide down" duration={500}>
					{visible && (
						<StyledMenu inverted vertical fluid animation="overlay">
							<MobileMenuItems menuitems={this.props.menuitems} />
						</StyledMenu>
					)}
				</Transition.Group>
			</Responsive>
		);
	}
}

export default withRouter(MenuMobile);
