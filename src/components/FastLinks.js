import React, { Component } from "react";
import { Menu, Icon, Container, Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import config from "../config.json";
import env from "../utils/env";


const node_env = env();

const ContainerFastLinks = styled(Container)`
	&& {
		@media only screen and (min-width: 1200px) {
			width: 1140px;
		}
		@media only screen and (max-width: 768px) {
			margin: 0!important;
		}
	}
`;

const FastMenu = styled(Menu)`
	&&& {
		border-radius: 0;
	}
`

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
`

class FastLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fastLinks: 5
		}
	}

	refineURL(url) {
		return "/" + url.substring(config[node_env].base_url.length);
	}

	buildFastLinks() {
		let buttons = [];
		let menuitems = this.props.menuitems;
		for (let item in menuitems) {
			let icon = menuitems[item].classes.join(' ');
				buttons.push(
					<Menu.Item
						key={item}
						as={Link}
						to={this.refineURL(menuitems[item].url)}
						name={icon}
					>
						<Icon name={icon} />
						{menuitems[item].title}
					</Menu.Item>
				);
		}
		return buttons;
	}

	render() {
		return(
			<ContainerFastLinks>
				<Responsive minWidth={768}>
				<FastMenu fluid widths={Object.keys(this.props.menuitems).length} icon="labeled">{this.buildFastLinks()}</FastMenu>
				</Responsive>
				<Responsive maxWidth={768}>
				<FastMenuMobile fluid>{this.buildFastLinks()}</FastMenuMobile>
				</Responsive>
			</ContainerFastLinks>
			)
	}
}

export default FastLinks;
