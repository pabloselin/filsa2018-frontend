import React, { Component } from "react";
import { Container, Dimmer, Button, Icon } from "semantic-ui-react";
import Masonry from "react-masonry-css";
import Image from "react-graceful-image";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
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

const InvHeader = styled.div`
	text-align: center;
	h2 {
		margin-bottom: 24px;
	}
`;

const StyledDimmer = styled(Dimmer)`
	&&& {
		margin: 0;
		border-radius: 0;
		overflow: scroll;
	}
`;

const InvContent = styled(Container)`
	img {
		max-width: 400px;
		height: auto;
		@media screen and (max-width:768px) {
			max-width: 100%;
		}
	}
	text-align: left;
`;
const Close = styled(Button)`
	&&& {
		display: block;
		text-transform: lowercase;
		margin-top: 12px;
	}
`;

class Invitados extends Component {
	constructor(props) {
		super(props);
		this.state = {
			invitado: null,
			breakpointColumnsObj: {
				default: 4,
				1100: 3,
				700: 2,
				500: 1
			},
			active: false,
			invcontent: null
		};

		this.toggleInvitado = this.toggleInvitado.bind(this);
		this.handleHide = this.handleHide.bind(this);
		this.gridRef = React.createRef();
	}

	componentDidMount() {}

	toggleInvitado(ev, data) {
		this.setState({
			invitado: this.state.invitado !== ev ? ev : null,
			invcontent: data,
			active: this.state.invitado !== ev ? true : false
		});
	}

	handleHide() {
		this.setState({
			invitado: null,
			invcontent: null,
			active: false
		});
	}

	render() {
		const { active } = this.state;
		return (
			<Container>
				{this.state.invitado !== null && (
					<StyledDimmer
						page
						active={active}
						onClickOutside={this.handleHide}
						verticalAlign="top"
					>
						<InvContent text>
							<InvHeader>
							<Image
								src={this.state.invcontent.foto[0]}
								alt={this.state.invcontent.nombre}
								width={this.state.invcontent.foto[1]}
								height={this.state.invcontent.foto[2]}
							/>

							<h2>{this.state.invcontent.nombre}</h2>
							</InvHeader>
							{ReactHtmlParser(this.state.invcontent.bio)}
							<Close icon color="red" onClick={this.handleHide}>
								<Icon name="close" /> Cerrar
							</Close>
						</InvContent>
					</StyledDimmer>
				)}
				<StyledMasonry
					innerRef={this.gridRef}
					breakpointCols={this.state.breakpointColumnsObj}
					className="invitados-grid"
					columnClassName="invitados-grid-column"
				>
					{this.props.invitados !== null
						? this.props.invitados.map((invitado, key) => (
								<Invitado
									onclick={this.toggleInvitado}
									active={
										this.state.invitado === key
											? true
											: false
									}
									key={key}
									id={key}
									data={invitado}
								/>
						  ))
						: null}
				</StyledMasonry>
			</Container>
		);
	}
}

export default Invitados;
