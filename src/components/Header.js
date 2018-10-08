import React, { Component } from "react";
import { Container, Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuRedes from "./MenuRedes";

const HeaderStyle = styled.div`
	@media (max-width: 768px) {
		margin-left: -1em;
		margin-right: -1em;
	}
`;

const ContainerHeader = styled(Container)`
	&& {
		line-height: 0;
		@media only screen and (min-width: 1200px) {
			width: 1140px;
		}
	}
`;
const StyledLink = styled(Link)`
	display: block;
	line-height: 0;
`;

const HeaderImage = styled.img`
	max-width: 100%;
	height: auto;
`;

class Header extends Component {
	render() {
		return (
			<div>
				<MenuRedes
					twitter={this.props.twitter}
					facebook={this.props.facebook}
					instagram={this.props.instagram}
					flickr={this.props.flickr}
					youtube={this.props.youtube}
				/>
				<ContainerHeader>
					<HeaderStyle>
						<Responsive {...Responsive.onlyMobile}>
							<HeaderImage
								src={this.props.mobileheaderimg}
								alt=""
							/>
						</Responsive>
						<Responsive minWidth={769}>
							<StyledLink to="/">
								<HeaderImage
									src={this.props.headerimg}
									alt=""
								/>
							</StyledLink>
						</Responsive>
					</HeaderStyle>
				</ContainerHeader>
			</div>
		);
	}
}

export default Header;
