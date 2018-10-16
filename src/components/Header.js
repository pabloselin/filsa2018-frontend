import React, { Component } from "react";
import { Container, Responsive, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "react-graceful-image";
import MenuRedes from "./MenuRedes";
import FastLinks from "./FastLinks";
import PreHeader from "./PreHeader";
import MenuTop from "./MenuTop";
import MenuMobile from "./MenuMobile";
import FilsaLogo from "../assets/img/filsa_side.png";

const HeaderStyle = styled.div`
	@media (max-width: 768px) {
		margin-left: -1em;
		margin-right: -1em;
	}
`;

const VideoHeader = styled.div`
	height: 385px;
	width: 100%;
	overflow: hidden;
	video {
		max-width: 100%;
		height: auto;
		margin-top: -45px;
	}
`;

const MainHeader = styled.div`
	background-color: #f1e9d9;
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

const HeaderImage = styled(Image)`
	max-width: 100%;
	height: auto;
`;

const StyledGridColumn = styled(Grid.Column)`
	background-color: #636363;
	img {
		margin-left: 24px;
	}
`;

const StyledVideoColumn = styled(Grid.Column)`
	background-color: #636363;
`;

class Header extends Component {
	menus() {
		let menuitems;
		menuitems = (
			<MenuTop
				menuitems={this.props.menu_principal}
				secondmenuitems={this.props.menu_dos}
			/>
		);
		return menuitems;
	}

	mobilemenu() {
		let menumobileitems;
		menumobileitems = (
			<MenuMobile
				menuitems={this.props.menu_principal}
				secondmenuitems={this.props.menu_dos}
				twitter={this.props.twitter}
				facebook={this.props.facebook}
				instagram={this.props.instagram}
				flickr={this.props.flickr}
				youtube={this.props.youtube}
			/>
		);
		return menumobileitems;
	}

	render() {
		return (
			<MainHeader>
				<Responsive minWidth={769}>
					<PreHeader />
				</Responsive>
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
								alt="FILSA 2018"
								width={360}
								height={110}
								placeholderColor="#f1e9d9"
							/>
						</Responsive>
						<Responsive minWidth={769}>
							<StyledLink to="/">
								<VideoHeader>
									<Grid>
										<StyledGridColumn width={2} textAlign="center">
										<img src={FilsaLogo} alt="FILSA 2018 - Cámara Chilena del Libro"/>
										</StyledGridColumn>
										<StyledVideoColumn width={14}>
											<video muted loop="true" autoPlay="true" poster={this.props.headerimg}>
												<source src={this.props.mp4} type="video/mp4" />
												<source src={this.props.mp4} type="video/webm" />
												<img src={this.props.headerimg} alt="FILSA 2018 - Cámara Chilena del Libro"/>
											</video>
										</StyledVideoColumn>
									</Grid>
								</VideoHeader>
							</StyledLink>
						</Responsive>
					</HeaderStyle>
				</ContainerHeader>
				<FastLinks menuitems={this.props.fastlinks} />
				<MenuTop
					menuitems={this.props.menu}
					secondmenuitems={this.props.menu_dos}
				/>
				<MenuMobile
					menuitems={this.props.menu}
					secondmenuitems={this.props.menu_dos}
					twitter={this.props.twitter}
					facebook={this.props.facebook}
					instagram={this.props.instagram}
					flickr={this.props.flickr}
					youtube={this.props.youtube}
				/>
			</MainHeader>
		);
	}
}

export default Header;
