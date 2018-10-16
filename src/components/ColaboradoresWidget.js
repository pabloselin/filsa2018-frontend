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
			autoplay: true
		};

		const orgs = [
			...this.props.colaboradores.apoya,
			...this.props.colaboradores.auspicia,
			...this.props.colaboradores.colaboran,
			...this.props.colaboradores.medios,
			...this.props.colaboradores.participa,
			...this.props.colaboradores.patrocina
		];
		const mainorgs = [...this.props.colaboradores.organiza];
		return (
			<Container>
				<Grid>
					<Grid.Column width={5}>
						<ColabHeader>Organizan</ColabHeader>
						<Grid columns={2}>
						{mainorgs.map(org => (

							<Grid.Column>
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
						<Slider {...settings}>
							{orgs.map(org => (
								<LogoBox>
								<StyledLogo
									key={org.nombre}
									src={org.logo[0]}
									width={org.logo[1]}
									height={org.logo[2]}
									alt={org.nombre}
								/>
								</LogoBox>
							))}
						</Slider>
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}

export default ColaboradoresWidget;
