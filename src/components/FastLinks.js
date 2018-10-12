import React, { Component } from "react";
import { Menu, Icon, Container, Responsive, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import config from "../config.json";
import env from "../utils/env";

const node_env = env();

const FastLinksWrapper = styled.div`
	background-color:  #f1e9d9;
`;

const ContainerFastLinks = styled(Container)`
	&& {
		border-top:1px solid rgba(34,36,38,.1);
		@media only screen and (min-width: 1200px) {
			width: 1140px;
		}
		@media only screen and (max-width: 768px) {
			margin: 0 !important;
		}
	}
`;

const FastMenu = styled(Menu)`
	&&& {
		border-radius: 0;
		border: 0;
	}
`;

const FastMenuMobile = styled(Menu)`
	&&& {
		border-radius: 0;
		flex-wrap: wrap;
		border: 0;
		justify-content: center;
		.item {
			padding: 12px;
			flex-grow: 1;
			border-bottom: 1px solid #ccc;
			text-align: center;
			display: block;
		}
	}
`;

const FastMenuItem = styled(Menu.Item)`
	&&&& {
		flex-grow: 1;
		padding: 14px 0 6px 0;
		font-family: 'Maitree', serif;
		background-color: #cc1012;
		color: #f1e9d9;
		font-weight: bold;
		border-radius: 0;
		&:hover, &.active {
			background-color: #990C0E;
			color: #f1e9d9;
		}
		&:before {
				background-color: #960b0e;
			}
		@media screen and (max-width: 768px) {
			padding: 6px 0 6px 0;
		}
	}
`;

const FastMenuParent = styled(Dropdown)`
	&&&& {
		flex-grow: 1;
		padding: 0 0 8px;
		border-radius: 0;
		font-family: 'Maitree', serif;
		background-color: #cc1012;
		color: #f1e9d9;
		font-weight: bold;
		&:before {
			border-right: 1px solid #960b0e;
		}
		&:hover, &:hover .item, &.active, &.active .item {
			background-color: #990C0E;
			color: #f1e9d9;
		}
		.dropdown.icon {
			position: absolute;
			bottom: 0;
			right: 12px;
			font-size: 18px;
		}
		@media screen and (max-width: 768px) {
			padding: 0;
			.item {
				border-bottom: 0;
			}
		}
		.item:before {
			background-color: transparent;
		}
	}
`;

class FastLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fastLinks: 5
		};
	}

	refineURL(url) {
		return "/" + url.substring(config[node_env].base_url.length);
	}

	buildFastLinks() {
		let buttons = [];
		let menuitems = this.props.menuitems;
		for (let item in menuitems) {
			let current = menuitems[item];
			let icon_class = menuitems[item].classes.join(" ");
			if (current.wpse_children !== undefined) {
				let child = current.wpse_children;
				let dropdown_items = [];
				let trigger = (
					<FastMenuItem key={item} name={icon_class}>
						<Icon name={icon_class} />
						{menuitems[item].title}
					</FastMenuItem>
				);

				for (let sub in child) {
					dropdown_items.push(
						<Dropdown.Item
							key={sub}
							as={NavLink}
							to={this.refineURL(child[sub].url)}
						>
							{child[sub].title}
						</Dropdown.Item>
					);
				}
				buttons.push(
					<FastMenuParent key={item} item trigger={trigger}>
						<Dropdown.Menu>{dropdown_items}</Dropdown.Menu>
					</FastMenuParent>
				);
			} else {
				buttons.push(
					<FastMenuItem
						key={item}
						as={NavLink}
						to={this.refineURL(menuitems[item].url)}
						name={icon_class}
					>
						<Icon name={icon_class} />
						{menuitems[item].title}
					</FastMenuItem>
				);
			}
		}
		return buttons;
	}

	render() {
		return (
			<FastLinksWrapper>
			<ContainerFastLinks>
				<Responsive minWidth={768}>
					<FastMenu fluid icon="labeled">
						{this.buildFastLinks()}
					</FastMenu>
				</Responsive>
				<Responsive maxWidth={768}>
					<FastMenuMobile fluid>
						{this.buildFastLinks()}
					</FastMenuMobile>
				</Responsive>
			</ContainerFastLinks>
			</FastLinksWrapper>
		);
	}
}

export default FastLinks;
