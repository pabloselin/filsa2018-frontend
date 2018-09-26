import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";

const InvitadoBox = styled.div`
	max-width: 300px;
	img {
		max-width: 100%;
		height: auto;
	}
`;

class Invitado extends Component {
	render() {
		return (
			<InvitadoBox>
				<img src={this.props.data.foto} alt={this.props.data.nombre} />
				<h2>{this.props.data.nombre}</h2>
				<div className="content">{ReactHtmlParser(this.props.data.bio)}</div>
			</InvitadoBox>
		);
	}
}

export default Invitado;
