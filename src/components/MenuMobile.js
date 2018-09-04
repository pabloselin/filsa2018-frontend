import React, { Component } from "react";
import {
	Button,
	Menu,
	Transition,
	Responsive
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import config from "../config.json";

const Toggler = styled(Button)`
	position:absolute;
	top:0;
	left:0;
`

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
				<Toggler onClick={this.handleVisibility}>Menu</Toggler>
				<Transition.Group animation="slide down" duration={500}>
					{visible && (
						<Menu inverted vertical animation="overlay">
							<Menu.Item key="home">
								<NavLink
									to={
										config[
											"base_path." + process.env.NODE_ENV
										]
									}
								>
									Inicio
								</NavLink>
							</Menu.Item>
							{this.props.menuitems.map((item, index) => (
								<Menu.Item key={index}>
									<NavLink to={this.refineURL(item.url)}>
										{item.title}
									</NavLink>
								</Menu.Item>
							))}
						</Menu>
					)}
				</Transition.Group>
			</Responsive>
		);
	}
}

export default MenuMobile;
