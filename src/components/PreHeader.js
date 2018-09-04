import React, { Component } from "react";
import { Container } from 'semantic-ui-react';

class PreHeader extends Component {
	render() {
		return (
			<div className="preheader">
				<Container>
				<a href="https://camaradellibro.cl">
					<img src="https://camaradellibro.cl/wp-content/themes/cchl_wp/img/filsa2014/cchl_filsaheader.png" alt="Cámara Chilena del Libro"/></a>
				<div className="redes">

				</div>
				</Container>
				<style>
				{`.preheader {
						background-color: #f8f8f8;
						border-bottom: 1px solid #ccc;
						padding: 3px;
					}`}
				</style>
			</div>
		);
	}
}

export default PreHeader;
