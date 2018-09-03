import React, { Component } from "react";


class Header extends Component {
	render() {
		return (
			<div className="header">
				<img src={this.props.headerimg} alt="" />
			</div>
		);
	}
}

export default Header;
