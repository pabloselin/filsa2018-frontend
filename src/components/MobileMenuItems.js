import React, { Component, Fragment } from "react";
import { Menu, Dropdown, Accordion, Icon } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import config from "../config.json";
import env from "../utils/env";

const node_env = env();

const StyledDropdown = styled(Dropdown.Item)`
	&&&&&&,
	&&&&&&:hover {
		background-color: #000 !important;
		color: white !important;
	}
`;

const NavMenuItem = styled(Menu.Item)`
	&&&&&& {
		color: white;
		font-weight: bold;
		&.active {
			font-weight: bold;
			background-color: #cc1011;
		}
	}
`;

const MenuAccordion = styled(Accordion)`
	&&& {
		color: white;
		font-weight: bold;
		.title {
			font-family: 'Helvetica Neue',Arial,Helvetica,sans-serif;
			color: white;
			padding: .9375em 1.125em;
			font-weight: bold;
		}
		.content {
			padding-top: 0;
		}
		.item {
			font-weight: bold;
		}
	}
`;

function refineURL(url) {
	return "/" + url.substring(config[node_env].base_url.length);
}

class MobileMenuItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: null
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(ev, data) {
		let current;
		if (this.state.activeIndex !== data.index) {
			current = data.index;
		} else {
			current = null;
		}
		this.setState({
			activeIndex: current
		});
	}

	buildMenu() {
		let buttons = [];
		let menuitems = this.props.menuitems;
		if(this.props.nohome !== true) {
		buttons.push(
			<NavMenuItem as={Link} key="home" to="/">
				<Icon name="home" /> Inicio
			</NavMenuItem>
		);
		}
		for (let item in menuitems) {
			let current = menuitems[item];
			if (current.wpse_children !== undefined) {
				let child = current.wpse_children;
				let dropdown_items = [];
				for (let sub in child) {
					dropdown_items.push(
						<StyledDropdown key={sub}>
							<NavLink to={refineURL(child[sub].url)}>
								{child[sub].title}
							</NavLink>
						</StyledDropdown>
					);
				}
				buttons.push(
					<MenuAccordion
						key={item}
					>
						<Accordion.Title
							as={Menu.Item}
							active={this.state.activeIndex === item}
							content={menuitems[item].title}
							index={item}
							onClick={this.handleClick}
						/>
						<Accordion.Content
							active={this.state.activeIndex === item}
							content={dropdown_items}
						/>
					</MenuAccordion>
				);
			} else {
				buttons.push(
					<NavMenuItem
						key={item}
						as={NavLink}
						to={refineURL(menuitems[item].url)}
					>
						{menuitems[item].title}
					</NavMenuItem>
				);
			}
		}
		return buttons;
	}

	render() {
		return <Fragment>{this.buildMenu()}</Fragment>;
	}
}

export default MobileMenuItems;
