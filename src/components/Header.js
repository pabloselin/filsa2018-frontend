import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class Header extends Component {
	render() {
		return (
			<div>
			<Container>
				<div className="header">
					<img src={this.props.headerimg} alt="" />
				</div>
			</Container>
				<style>{`
					.header img {
						max-width: 100%;
					}
				`}</style>
			</div>
		);
	}
}

export default Header;
