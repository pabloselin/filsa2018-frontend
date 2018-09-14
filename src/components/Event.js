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
						<div>
							<Icon name="clock" /> {this.props.data.startdate} -{" "}
							{this.props.data.enddate}
						</div>
						{this.props.data.cursos &&
						<div>
							<Icon name="users" />{" "}
							{this.props.data.cursos.map((curso, key) => (
								<Label key={key}>{curso}</Label>
							))}
						</div>
						}
						{this.props.data.organizadores &&
							<div><Icon name="flag" /> Organiza: {this.props.data.organizadores}</div>
						}
						
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
