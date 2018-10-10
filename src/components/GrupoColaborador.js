import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import Image from "react-graceful-image";
import styled from "styled-components";

const Logo = styled(Image)`
	height: auto;
`;

const Name = styled.h4`
	margin: 0 0 12px 0;
`;

const Colabo = styled(Grid.Column)`
	&&&& {
		margin-bottom: 24px;
	}
`;

class GrupoColaborador extends Component {
	render() {
		return (
			<Container>
			<Grid columns={4} doubling centered>
				<Grid.Row textAlign="center">
				<h2>{this.props.title}</h2>
				</Grid.Row>
				<Grid.Row textAlign="center">
				{this.props.grupo.map(colaborador => (
					<Colabo textAlign="center" key={colaborador.nombre}>
						<Logo src={colaborador.logo[0]} width={colaborador.logo[1]} height={colaborador.logo[2]} alt={colaborador.nombre} />
						<Name>{colaborador.nombre}</Name>
					</Colabo>
				))}
				</Grid.Row>
			</Grid>
			</Container>
		);
	}
}

export default GrupoColaborador;
