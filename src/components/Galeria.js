import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Carousel from "./Carousel";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class Galeria extends Component {
	render() {
		return (
			<Container>
				{this.props.items.map((item, key) => <Carousel key={key} nombre={item.nombre} imagenes={item.imagenes} />)}
			</Container>
		);
	}
}

export default Galeria;
