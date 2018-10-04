import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import config from "../config.json";
import env from "../utils/env";

const node_env = env();

const StyledDropdown = styled(Dropdown)`
	&&&& {
		font-weight: bold;
		color: white;
	}
`;

const StyledDropdownItem = styled(Dropdown.Item)`
	&&&&&&,
	&&&&&&:hover,
	&&&&&.active.item
	 {
		background-color: #000 !important;
		color: white !important;
		font-weight: bold;
		font-size: 13px;
	}
`;

const NavMenuItem = styled(Menu.Item)`
	&&&&&& {
		color: white;
		font-weight: bold;
		border-right: 1px solid #555;
		&.active {
			font-weight: bold;
			background-color: #cc1011;
		}
	}
`;

function refineURL(url) {
	return "/" + url.substring(config[node_env].base_url.length);
}

export function menuItems(menuitems, with_home) {
	let buttons = [];
	if (with_home === true) {
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
					<StyledDropdownItem
						key={sub}
						as={NavLink}
						to={refineURL(child[sub].url)}
					>
						{child[sub].title}
					</StyledDropdownItem>
				);
			}
			buttons.push(
				<StyledDropdown key={item} item text={menuitems[item].title}>
					<Dropdown.Menu>{dropdown_items}</Dropdown.Menu>
				</StyledDropdown>
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
