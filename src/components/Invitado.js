import React, { Component } from "react";
import styled from "styled-components";

const InvitadoBox = styled.div`
	position: relative;
	cursor: pointer;
	img {
		max-width: 100%;
		height: auto;
		filter: grayscale(100%);
		transition: all ease-in 0.2s;
	}
	h2 {
		position: absolute;
		bottom: 12px;
		left: 12px;
		color: white;
		transition: all ease-in 0.2s;
		text-shadow: 1px 1px 5px #333;
	}
	&:hover {		
		h2 {
			bottom: 24px;
		}
		img {
			filter: none;
			box-shadow: 0 0 4px #333;
		}
	}
`;

class Invitado extends Component {
	render() {
		return (
			<InvitadoBox onClick={() => this.props.onclick(this.props.id, this.props.data)} className={this.props.active ? 'active' : 'standby'}>
				<img src={this.props.data.foto_grande} alt={this.props.data.nombre} />
				<h2>{this.props.data.nombre}</h2>
			</InvitadoBox>
		);
	}
}

export default Invitado;
