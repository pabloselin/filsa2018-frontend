import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label } from "semantic-ui-react";

class Event extends Component {
	render() {
		return (
			<Card fluid>
				<Card.Content>
					<Card.Header>{this.props.title}</Card.Header>
					<Card.Meta>
						<p>
							<Icon name="clock" /> {this.props.data.startdate} -{" "}
							{this.props.data.enddate}
						</p>
						<p>
							<Icon name="users" />{" "}
							{this.props.data.cursos.map((curso, key) => (
								<Label key={key}>{curso}</Label>
							))}
						</p>
						<p>
							<Icon name="flag" /> Organiza: {this.props.data.organizadores}
						</p>
					</Card.Meta>
				</Card.Content>
				<Card.Content extra>
					<Link to={`/eventos/${this.props.data.slug}/`}>
						<Icon name="chain" /> Ver todo
					</Link>
				</Card.Content>
			</Card>
		);
	}
}

export default Event;
