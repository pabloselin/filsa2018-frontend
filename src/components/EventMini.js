import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Item, Icon, Flag } from "semantic-ui-react";
import _ from "lodash";

const EventType = styled.span`
	text-transform: uppercase;
	font-family: sans-serif;
	font-size: 13px;
	display: block;
	font-weight: normal;
	color: #ada89c;
`;

const StyledFlag = styled(Flag)`
	position: absolute;
	right: 0;
	top: 16px;
`;

const InfoEvento = styled.div`
	margin-top: 6px;
	margin-bottom: 6px;
	font-size: 14px;
	color: #333;
`;

const StyledLink = styled(Link)`
	color: #cc1012;
	font-family: "Maitree", serif;
	font-size: 18px;
	font-weight: 700;
`;

class EventMini extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDesc: false
		};
	}

	render() {
		const timeLapse =
			this.props.data.startdate !== this.props.data.enddate
				? `${this.props.data.startdate}-${this.props.data.enddate}`
				: `${this.props.data.startdate}`;

		const shortTitle = _.truncate(this.props.title, {'length': 90, 'omission': '...' })
		return (
			<Item>
				<Item.Content>
					<Item.Header>
						<EventType>
							{this.props.data.tipo_eventos.join(" - ")}
						</EventType>

						<StyledLink to={`/eventos/${this.props.data.slug}/`}>
							{shortTitle}{" "}
						</StyledLink>

						{this.props.data.organizaperu && (
							<StyledFlag name="pe" />
						)}
					</Item.Header>
					<Item.Meta>
						{this.props.showday && (
							<InfoEvento>
								<Icon name="calendar" />{" "}
								{this.props.data.startday}
							</InfoEvento>
						)}
						<InfoEvento>
							<Icon name="clock" /> {timeLapse}
						</InfoEvento>
						{this.props.data.lugar && (
							<InfoEvento>
								<Icon name="map marker alternate" /> Lugar:{" "}
								{this.props.data.lugar}
							</InfoEvento>
						)}
					</Item.Meta>
				</Item.Content>
			</Item>
		);
	}
}

export default EventMini;
