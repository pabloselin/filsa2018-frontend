import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
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
		text-transform: uppercase;
		&.active {
			font-weight: bold;
			background-color: #cc1011;
		}
	}
`;

function refineURL(url) {
	return "/" + url.substring(config[node_env].base_url.length);
}

export function menuItems(menuitems) {
	let buttons = [];
	buttons.push(
		<NavMenuItem as={Link} key="home" to="/">
			<Icon name="home" /> Inicio
		</NavMenuItem>
	);
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
				<Dropdown key={item} item text={menuitems[item].title}>
					<Dropdown.Menu>{dropdown_items}</Dropdown.Menu>
				</Dropdown>
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
