import React, { Component } from "react";
import { Icon, Responsive, Popup } from "semantic-ui-react";
import Slider from "react-slick";
import styled from "styled-components";

const GalImage = styled.img`
	max-width: 100%;
	height: auto;
`;

const StyledSlider = styled(Slider)`
	margin: 0 0 24px;
	background-color: #000;
	text-align: center;
	.slick-arrow:before {
		color: white;
		font-size: 32px;
	}
	.slick-prev,
	.slick-next {
		z-index: 10;
		width: 32px;
		height: 32px;
		text-align: center;
	}
	.slick-next {
		right: 12px;
	}
	.slick-prev {
		left: 12px;
	}
	img {
		margin: 0 auto;
	}
`;

const Title = styled.h2`
	position: absolute;
	bottom: 0;
	padding: 12px;
	background-color: rgba(0, 0, 0, 0.6);
	font-family: "Maitree", serif;
	color: white;
	font-size: 16px;
`;

const GalHeader = styled.h1`
	font-size: 16px;
	margin: 24px 0 0 0;
	padding: 12px;
	background-color: #000;
	color: white;
`;

const Counter = styled.span`
	font-size: 13px;
	font-family: sans-serif;
	font-weight: normal;
	color: #f0f0f0;
`;

const ResponsiveHelp = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	padding: 12px;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
`;

const CarouselContainer = styled.div`
	position: relative;
`;

class Carousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0
		};
	}
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			lazyLoad: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						dots: false,
						arrows: false
					}
				}
			],
			afterChange: index => this.setState({ current: index })
		};
		const imagenes = Object.values(this.props.imagenes);
		console.log(imagenes);
		return (
			<CarouselContainer>
				<GalHeader>
					<Icon name="picture" />
					{this.props.nombre}{" "}
					<Counter>[{this.state.current + 1} de {imagenes.length} imágenes]</Counter>
				</GalHeader>
				<StyledSlider {...settings}>
					{imagenes.map((imagen, key) => (
						<div key={key}>
							<GalImage
								src={imagen.large[0]}
								width={imagen.large[1]}
								height={imagen.large[2]}
								title={imagen.title}
							/>
							<Title>{imagen.title}</Title>
						</div>
					))}
				</StyledSlider>
				<Responsive
					trigger={
						<ResponsiveHelp>
							<Icon name="hand pointer" />
							<Icon name="long arrow alternate right" />
						</ResponsiveHelp>
					}
					as={Popup}
					{...Responsive.onlyMobile}
				>
					<Popup.Content>
						Galería de imágenes, deslizar para avanzar
					</Popup.Content>
				</Responsive>
			</CarouselContainer>
		);
	}
}

export default Carousel;
