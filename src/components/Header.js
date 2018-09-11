import React, { Component } from "react";
import { Container, Responsive } from "semantic-ui-react";
import styled from "styled-components";

const HeaderStyle = styled.div`
	@media(max-width: 768px) {
		margin-left: -1em;
		margin-right: -1em;
	}
`

const ContainerHeader = styled(Container)`
	&& {
		@media only screen and (min-width: 1200px) {
			width: 1140px;
		}
	}
`

const HeaderImage = styled.img`
	max-width: 100%;
	height: auto;
`

class Header extends Component {
	render() {
		return (
			<div>
			<ContainerHeader>
				<HeaderStyle>
				<Responsive {...Responsive.onlyMobile}>
					<HeaderImage src={this.props.mobileheaderimg} alt="" />
				</Responsive>
				<Responsive {...Responsive.onlyComputer}>
					<HeaderImage src={this.props.headerimg} alt="" />
				</Responsive>
				</HeaderStyle>
			</ContainerHeader>
			</div>
		);
	}
}

export default Header;
