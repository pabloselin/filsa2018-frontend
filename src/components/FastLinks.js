import React, { Component } from "react";
import { Menu, Icon, Container } from "semantic-ui-react";
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
	}
`;

const FastMenu = styled(Menu)`
	&&& {
		border-radius: 0;
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
				<FastMenu fluid widths={Object.keys(this.props.menuitems).length} icon="labeled">{this.buildFastLinks()}</FastMenu>
			</ContainerFastLinks>
			)
	}
}

export default FastLinks;
