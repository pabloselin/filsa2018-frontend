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
`;

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
						{this.props.data.cursos && (
							<InfoEvento>
								<Icon name="users" />{" "}
								{this.props.data.cursos.map((curso, key) => (
									<Label key={key}>{curso}</Label>
								))}
							</InfoEvento>
						)}
						{this.props.data.organizadores && (
							<InfoEvento>
								<Icon name="flag" /> Organiza:{" "}
								{this.props.data.organizadores}
							</InfoEvento>
						)}
					</Card.Meta>
				</Card.Content>
				<Card.Content extra>
				<Grid columns={2}>
					<Grid.Column>
					{this.props.formurl && (
						<Button size="tiny" as="a" color="red" href={this.props.formurl} target="_blank">
							Inscripciones
						</Button>
					)}
					</Grid.Column>
					<Grid.Column>
					<Button floated="right" size="tiny" as={Link} to={`/eventos/${this.props.data.slug}/`}>
						<Icon name="chain" /> Ver todo
					</Button>
					</Grid.Column>
				</Grid>
				</Card.Content>
			</Card>
		);
	}
}

export default Event;
