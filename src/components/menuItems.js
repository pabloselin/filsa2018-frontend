import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import config from "../config.json";

const node_env = process.env.NODE_ENV || 'development';


function refineURL(url) {
		return (
			"/" +
			url.substring(config[node_env].base_url.length)
		);
	}

export function menuItems(menuitems) {
		let buttons = [];
		for (let item in menuitems) {
			let current = menuitems[item];
			if(current.wpse_children !== undefined) {
				let child = current.wpse_children;
				let dropdown_items = [];
				for(let sub in child) {
					dropdown_items.push(
						<Dropdown.Item key={sub}><NavLink to={refineURL(child[sub].url)}>{child[sub].title}</NavLink></Dropdown.Item>
						);
				}
				buttons.push(<Dropdown key={item} item text={menuitems[item].title}><Dropdown.Menu>{dropdown_items}</Dropdown.Menu></Dropdown>);
			} else {
				buttons.push(
				<Menu.Item key={item}>
					<NavLink to={refineURL(menuitems[item].url)}>
						{menuitems[item].title}
					</NavLink>
				</Menu.Item>);
			}
			
		}
		return buttons;
	}