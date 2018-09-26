import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Masonry from "react-masonry-css";
import styled from "styled-components";
import Invitado from "./Invitado";

const StyledMasonry = styled(Masonry)`
	display: flex;
	margin-left: -10px; /* gutter size offset */
	width: auto;
	.invitados-grid-column {
		padding-left: 10px; /* gutter size */
		background-clip: padding-box;
	}
`;

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};


class Invitados extends Component {
	constructor(props) {
		super(props);
		this.state = {
			invitado: null
		};
	}

	componentDidMount() {}

	toggleInvitado(ev, inv) {
		console.log(inv);
	}

	render() {
		return (
			<Container>
				<StyledMasonry
					breakpointCols={breakpointColumnsObj}
					className="invitados-grid"
					columnClassName="invitados-grid-column"
				>
					{this.props.invitados.map((invitado, key) => (
						<Invitado
							onClick={this.toggleInvitado.bind(this)}
							active={this.state.invitado === key ? true : false}
							key={key}
							data={invitado}
						/>
					))}
				</StyledMasonry>
			</Container>
		);
	}
}

export default Invitados;
