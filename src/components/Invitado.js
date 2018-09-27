import React, { Component } from "react";
import styled from "styled-components";

const InvitadoBox = styled.div`
	position: relative;
	img {
		max-width: 100%;
		height: auto;
	}
	h2 {
		position: absolute;
		bottom: 12px;
		left: 12px;
		color: white;
	}
`;

class Invitado extends Component {
	render() {
		return (
			<InvitadoBox onClick={() => this.props.onclick(this.props.id, this.props.data)} className={this.props.active ? 'active' : 'standby'}>
				<img src={this.props.data.foto} alt={this.props.data.nombre} />
				<h2>{this.props.data.nombre}</h2>
			</InvitadoBox>
		);
	}
}

export default Invitado;
