import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Loading from "./Loading";
import SocialButtons from "./SocialButtons";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import api from "../utils/api";

const OtherInfo = styled.div`
	font-size: 14px;
`;

class EventSingle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			event: null,
			date: null,
			day: null,
			start_hour: null,
			end_hour: null
		};
	}

	componentDidMount() {
		api.get(
			"/tribe/events/v1/events/by-slug/" + this.props.match.params.slug
		).then(res => {
			this.setState({
				event: res.data,
				date: new Date(res.data.start_date),
				day: res.data.start_date_details.day,
				start_hour:
					res.data.start_date_details.hour +
					":" +
					res.data.start_date_details.minutes,
				end_hour:
					res.data.end_date_details.hour +
					":" +
					res.data.end_date_details.minutes
			});
		});
	}

	returnDateThing(date, thing) {
		return date.toLocaleDateString("es-ES", { [thing]: "long" });
	}

	render() {
		const loading = this.state.event !== null;
		return (
			<Container text>
				{loading ? (
					<div>
						<h1>{this.state.event.title}</h1>
						<SocialButtons
							url={this.props.location.pathname}
							title={this.state.event.title}
						/>
						<div>{ReactHtmlParser(this.state.event.intro)}</div>
						<div className="timeinfo">
							<div>
								Fecha:{" "}
								{this.returnDateThing(
									this.state.date,
									"weekday"
								)}, {this.state.event.start_date_details.day}{" "}
								{this.returnDateThing(this.state.date, "month")}
							</div>
							<div>
								Hora: {this.state.start_hour} -{" "}
								{this.state.end_hour}
							</div>
						</div>
						<OtherInfo>
							Organizadores:{" "}
							{this.state.event.organizer.map(organize => (
								<p>{organize.organizer}</p>
							))}
						</OtherInfo>
					</div>
				) : (
					<Loading />
				)}
			</Container>
		);
	}
}

export default EventSingle;
