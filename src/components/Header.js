import React, { Component } from "react";
import { Container } from "semantic-ui-react";
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
					<HeaderImage src={this.props.headerimg} alt="" />
				</HeaderStyle>
			</ContainerHeader>
			</div>
		);
	}
}

export default Header;
