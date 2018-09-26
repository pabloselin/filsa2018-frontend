import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Invitado from "./Invitado";

class Invitados extends Component {
	constructor(props) {
		super(props);
		this.state = {
			invitado: null
		};
	}

	componentDidMount() {}

	render() {
		return (
			<Container>
				{this.props.invitados.map(invitado => <Invitado data={invitado} />)}
			</Container>
		);
	}
}

export default Invitados;
