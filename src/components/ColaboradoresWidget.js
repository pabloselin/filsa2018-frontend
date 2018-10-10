import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import styled from "styled-components";
import Image from "react-graceful-image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledLogo = styled(Image)`
	height: auto;
	max-width: 100%;
	max-height: 300px;
	display: inline-block;
	vertical-align: middle;
	margin: 0 6px 12px 0;
	padding: 12px;
`;

const ColabHeader = styled.h2`
	&&& {
		font-size: 16px;
		color: #555;
		margin-top: 24px;
	}
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
							<StyledLogo
								key={org.nombre}
								src={org.logo[0]}
								width={org.logo[1]}
								height={org.logo[2]}
								alt={org.nombre}
							/>
							</Grid.Column>
						))}
						</Grid>
					</Grid.Column>
					<Grid.Column width={11}>
						<ColabHeader>FILSA agradece a...</ColabHeader>
						<Slider {...settings}>
							{orgs.map(org => (
								<StyledLogo
									key={org.nombre}
									src={org.logo[0]}
									width={org.logo[1]}
									height={org.logo[2]}
									alt={org.nombre}
								/>
							))}
						</Slider>
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}

export default ColaboradoresWidget;
