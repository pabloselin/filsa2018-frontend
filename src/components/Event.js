import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Icon, Label, Grid, Button } from "semantic-ui-react";
import editUrl from "../utils/editUrl";
import ReactHtmlParser from "react-html-parser";

const EventType = styled("span")`
	text-transform: uppercase;
	font-family: sans-serif;
	font-size: 13px;
	display: block;
	font-weight: normal;
	color: #ada89c;
`;

const InfoEvento = styled.div`
	margin-top: 6px;
	margin-bottom: 6px;
	font-size: 14px;
	color: #333;
`;

const StyledLabel = styled(Label)`
	@media screen and (max-width: 769px) {
		&&& {
			margin-bottom: 6px;
		}
	}
`;

const BackButton = styled(Button)`
	@media screen and (max-width: 769px) {
		&&& {
			margin-top: 12px;
		}
	}
`

const EditLink = styled.a`
	font-family: sans-serif;
	font-size: 13px;
	display: inline-block;
	margin-left: 6px;
	font-weight: normal;
`;

const StyledLink = styled(Link)`
	color: #333;
`

class Event extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDesc: false
		};
	}

	editLink() {
		let editlink;
		if (window.loggedin === true) {
			editlink = (
				<EditLink href={editUrl(this.props.id)}>[Editar]</EditLink>
			);
		}
		return editlink;
	}

	showDesc() {
		this.setState({
			showDesc: this.state.showDesc ? false : true
		});
	}

	render() {
		const showDesc = this.state.showDesc ? (
			<Button
				icon
				size="tiny"
				title="cerrar"
				onClick={this.showDesc.bind(this)}
			>
				<Icon name="minus" /> info
			</Button>
		) : (
			<Button
				icon
				size="tiny"
				title="Ver más"
				onClick={this.showDesc.bind(this)}
			>
				<Icon name="plus" /> info
			</Button>
		);
		const backLink = this.props.visitaguiada ? (
			<BackButton
				color="teal"
				icon
				size="tiny"
				title="Volver a visitas guiadas"
				as={Link}
				to="/visitas-guiadas-colegios/"
			>
				<Icon name="reply" /> Volver a visitas de colegios
			</BackButton>
		) : (
			<BackButton
				color="teal"
				size="tiny"
				title="Volver a programa cultural"
				as={Link}
				to="/programa-cultural/"
			>
				<Icon name="reply" /> Volver al programa cultural
			</BackButton>
		);
		return (
			<Card fluid>
				<Card.Content>
					<Card.Header>
						<EventType>
							{this.props.data.tipo_eventos.join(" - ")}
						</EventType>
						{this.props.single ? (
							<span>{this.props.title} {this.editLink()}</span>
						) : (
							<StyledLink to={`/eventos/${this.props.data.slug}/`}>
								{" "}
								{this.props.title}{" "}
							</StyledLink>
						)}
					</Card.Header>
					<Card.Meta>
						{this.props.showday && (
							<InfoEvento>
								<Icon name="calendar" />{" "}
								{this.props.data.startday}
							</InfoEvento>
						)}
						<InfoEvento>
							<Icon name="clock" /> {this.props.data.startdate} -{" "}
							{this.props.data.enddate}
						</InfoEvento>
						{this.props.data.lugar && (
							<InfoEvento>
								<Icon name="map marker alternate" /> Lugar:{" "}
								{this.props.data.lugar}
							</InfoEvento>
						)}
						{this.props.data.cursos.length > 0 && (
							<InfoEvento>
								<Icon name="users" />{" "}
								{this.props.data.cursos.map((curso, key) => (
									<StyledLabel key={key}>{curso}</StyledLabel>
								))}
							</InfoEvento>
						)}
						{this.props.data.organizadores && (
							<InfoEvento>
								<Icon name="flag" /> Organiza:{" "}
								{this.props.data.organizadores}
							</InfoEvento>
						)}
						{this.props.data.cupos && (
							<InfoEvento>
								<Icon name="ticket" /> Cupos:{" "}
								{this.props.data.cupos}
							</InfoEvento>
						)}
					</Card.Meta>
				</Card.Content>
				{this.state.showDesc && (
					<Card.Content>
						{ReactHtmlParser(this.props.data.content)}
					</Card.Content>
				)}
				{this.props.single && (
					<Card.Content>
						{ReactHtmlParser(this.props.data.content)}
					</Card.Content>
				)}

				<Card.Content extra>
					<Grid columns={2}>
						<Grid.Column width={12}>
							{this.props.formurl && (
								<Button
									icon
									disabled={this.props.cerrado ? true : false}
									size="tiny"
									as="a"
									color="red"
									href={this.props.formurl}
									target="_blank"
								>
									<Icon name="ticket" /> Inscripciones{" "}
									{this.props.cerrado && "cerradas"}
								</Button>
							)}
							{this.props.single !== true && showDesc}
							{this.props.single === true && backLink}
						</Grid.Column>
						<Grid.Column width={4}>
							{this.props.single !== true && (
								<Button
									icon
									floated="right"
									size="tiny"
									as={Link}
									title="Enlace permanente"
									to={`/eventos/${this.props.data.slug}/`}
								>
									<Icon name="chain" />
								</Button>
							)}
						</Grid.Column>
					</Grid>
				</Card.Content>
			</Card>
		);
	}
}

export default Event;
