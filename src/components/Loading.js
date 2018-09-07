import React, { Component } from "react";
import { Container, Icon } from "semantic-ui-react";
import styled from "styled-components";

const ContainerLoader = styled(Container)`
	text-align: center;
	padding: 24px 0;
	font-size: 36px;
	color: #ccc;
`;

class Noticia extends Component {
	render() {
		return (
			<ContainerLoader className="loading">
				<Icon loading name="asterisk" />
			</ContainerLoader>
		);
	}
}

export default Noticia;
