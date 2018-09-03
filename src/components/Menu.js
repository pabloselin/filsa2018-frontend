import React, { Component } from "react";

class Menu extends Component {
	render() {
		return (
			<div className="menu">
				<ul>
				{this.props.menuitems.map(item => <li><a href={item.url}>{item.title}</a></li>)}
				</ul>
			</div>
		);
	}
}

export default Menu;
