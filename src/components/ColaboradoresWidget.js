import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import styled from "styled-components";
import Image from "react-graceful-image";
import Slider from "react-slick";

const StyledLogo = styled(Image)`
	max-width: 100%;
	height: auto;
	align-self: center;
`;

const ColabHeader = styled.h2`
	&&& {
		font-size: 16px;
		color: #555;
		margin-top: 24px;
	}
`;

const ColabSlider = styled(Slider)`
	.slick-track {
		display: flex;
	}
	.slick-slide {
		align-self: center;
	}
`;

const LogoBox = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
`;

class ColaboradoresWidget extends Component {
	componentDidMount() {}

	render() {
		const settings = {
			dots: false,
			infinite: true,
			slidesToShow: 6,
			speed: 500,
			slideToScroll: 1,
			autoplay: true,
			pauseOnHover: false
		};

		const mainorgs = [...this.props.colaboradores.organiza];
		const firstorgs = mainorgs.slice(0,2);
		const otherorgs = mainorgs.slice(2);

		return (
			<Container>
				<Grid>
					<Grid.Column width={5}>
						<ColabHeader>Organizan</ColabHeader>
						<Grid columns={2}>
						{firstorgs.map((org, key) => (

							<Grid.Column key={key}>
							<LogoBox>
							<StyledLogo
								key={org.nombre}
								src={org.logo[0]}
								width={org.logo[1]}
								height={org.logo[2]}
								alt={org.nombre}
							/>
							</LogoBox>
							</Grid.Column>
						))}
						</Grid>
					</Grid.Column>
					<Grid.Column width={11}>
						<ColabHeader>FILSA agradece a...</ColabHeader>
						<ColabSlider {...settings}>
							{otherorgs.map((org,key) => (
								<LogoBox key={key}>
								<StyledLogo
									key={org.nombre}
									src={org.logo[0]}
									width={org.logo[1]}
									height={org.logo[2]}
									alt={org.nombre}
								/>
								</LogoBox>
							))}
						</ColabSlider>
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}

export default ColaboradoresWidget;
