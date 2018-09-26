import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";

const InvitadoBox = styled.div`
	max-width: 300px;
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
			<InvitadoBox className={this.props.active ? 'active' : 'standby'}>
				<img src={this.props.data.foto} alt={this.props.data.nombre} />
				<h2>{this.props.data.nombre}</h2>
				{this.props.active && (<div className="content">{ReactHtmlParser(this.props.data.bio)}</div>)}
			</InvitadoBox>
		);
	}
}

export default Invitado;
