import React, { Component } from "react";
import { Card, Label, Icon, List } from "semantic-ui-react";
import styled from "styled-components";

const LocLabel = styled(Label)`
	&& {
		text-transform: uppercase;
	}
`;

const LocationItem = styled(List.Item)`
	&& {
		margin: 6px 0;
	}
`

class Expositor extends Component {
	render() {
		return (
			<Card fluid>
				<Card.Content>
					<Card.Header>{this.props.data.title}</Card.Header>
					<Card.Meta>
						<List>
						{this.props.data.location
							? this.props.data.location.map((loc, key) => (
									<LocationItem key={key}>
											<Label><Icon name="map outline" /> Stands:</Label>
											{Object.values(
												loc.filsa2018stands
											).map((stand, key) => (
												<Label key={`stand-${key}`} circular color="blue">
													{stand}
												</Label>
											))}
											<LocLabel color="blue">
											Sector {loc.filsa2018sector}
											</LocLabel>
									</LocationItem>
							  ))
							: null}
						</List>
					</Card.Meta>
				</Card.Content>
			</Card>
		);
	}
}

export default Expositor;
