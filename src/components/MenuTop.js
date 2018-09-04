import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import config from "../config.json";

class MenuTop extends Component {

  refineURL(url) {
    return config["base_path." + process.env.NODE_ENV] + url.substring(config["base_url." + process.env.NODE_ENV].length);
  }

	render() {
		return (
			<div className="menu">
				<Menu inverted>
					{this.props.menuitems.map((item, index) => (
						<Menu.Item key={index} >
							<NavLink to={this.refineURL(item.url)}>{item.title}</NavLink>
						</Menu.Item>
					))}
				</Menu>
			</div>
		);
	}
}

export default MenuTop;
