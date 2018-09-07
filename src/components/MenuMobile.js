import React, { Component } from "react";
import { Button, Menu, Transition, Responsive, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import config from "../config.json";

const Toggler = styled(Button)`
	&& {
		position: absolute;
		top: 0;
		left: 0;
		color: white;
		border-radius: 0;
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
		a {
			text-transform: uppercase;
		}
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

	refineURL(url) {
		return (
			config["base_path." + process.env.NODE_ENV] +
			url.substring(config["base_url." + process.env.NODE_ENV].length)
		);
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
							<Menu.Item key="home">
								<NavLink to="/">
									<Icon name="home" /> Inicio
								</NavLink>
							</Menu.Item>
							{this.props.menuitems.map((item, index) => (
								<Menu.Item key={index}>
									<NavLink to={"/" + this.refineURL(item.url)}>
										{item.title}
									</NavLink>
								</Menu.Item>
							))}
						</StyledMenu>
					)}
				</Transition.Group>
			</Responsive>
		);
	}
}

export default MenuMobile;
