import React, { Component } from "react";
import { Menu, Responsive, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import config from "../config.json";


const StyledMenu = styled(Menu)`
	&& {
		border-radius: 0;	
	}
`

class MenuTop extends Component {
	refineURL(url) {
		return (
			config["base_path." + process.env.NODE_ENV] +
			url.substring(config["base_url." + process.env.NODE_ENV].length)
		);
	}

	render() {
		return (
			<Responsive {...Responsive.onlyComputer}>
				<StyledMenu inverted>
					<Menu.Item key="home">
						<NavLink
							to={config["base_path." + process.env.NODE_ENV]}
						>
							<Icon name="home"/> Inicio
						</NavLink>
					</Menu.Item>
					{this.props.menuitems.map((item, index) => (
						<Menu.Item key={index}>
							<NavLink to={this.refineURL(item.url)}>
								{item.title}
							</NavLink>
						</Menu.Item>
					))}
				</StyledMenu>
			</Responsive>
		);
	}
}

export default MenuTop;
