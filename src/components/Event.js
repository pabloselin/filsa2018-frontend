import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Icon, Label, Grid, Button } from "semantic-ui-react";

const EventType = styled("span")`
	text-transform: uppercase;
	font-family: sans-serif;
	font-size: 13px;
	display: block;
	span {
		display: inline-block;
		margin-right: 6px;
		font-weight: normal;
		color: #ada89c;
	}
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
`

class Event extends Component {
	render() {
		return (
			<Card fluid>
				<Card.Content>
					<Card.Header>
						<EventType>
							{this.props.data.tipo_eventos.map((tipo, key) => (
								<span key={key}>{tipo}</span>
							))}
						</EventType>
						{this.props.title}
					</Card.Header>
					<Card.Meta>
						{this.props.showday && (
						<InfoEvento>
							<Icon name="calendar" /> {this.props.data.startday}
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
				<Card.Content extra>
				<Grid columns={2}>
					<Grid.Column width={12}>
					{this.props.formurl && (
						<Button icon disabled={this.props.cerrado ? true : false} size="tiny" as="a" color="red" href={this.props.formurl} target="_blank">
							<Icon name="ticket" /> Inscripciones {this.props.cerrado && 'cerradas'}
						</Button>
					)}
					</Grid.Column>
					<Grid.Column width={4}>
					{(this.props.single !== true) &&
					<Button icon floated="right" size="tiny" as={Link} title="Enlace permanente" to={`/eventos/${this.props.data.slug}/`}>
						<Icon name="chain" />
					</Button>
					}
					</Grid.Column>
				</Grid>
				</Card.Content>
			</Card>
		);
	}
}

export default Event;
