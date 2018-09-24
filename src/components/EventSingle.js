import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Loading from "./Loading";
import SocialButtons from "./SocialButtons";
import ReactHtmlParser from "react-html-parser";
import trackPage from "../utils/trackPage";
import Event from "./Event";
import styled from "styled-components";
import api from "../utils/api";

const StyledContainer = styled(Container)`
	margin-top: 32px;
`;

class EventSingle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			event: null,
			formurl: null
		};
	}

	componentDidMount() {
		trackPage(this.props.location.pathname);
		api.get("/filsa2018/v1/events/" + this.props.match.params.slug).then(
			res => {
				this.setState({
					event: res.data
				});
			}
		);
		api.get("/filsa2018/v1/options/filsa2018_formurl").then(res => {
			this.setState({
				formurl: res.data
			});
		});
	}

	returnDateThing(date, thing) {
		return date.toLocaleDateString("es-ES", { [thing]: "long" });
	}

	render() {
		const loading = this.state.event !== null;
		return (
			<StyledContainer text>
				{loading ? (
					<div>
						<Event
							key={this.state.event.id}
							title={this.state.event.title}
							fullday={this.state.event.daykey}
							data={this.state.event}
							cerrado={this.state.event.cerrado}
							single={true}
							formurl={(this.state.formurl !== null && this.state.formurl !== false)? this.state.formurl : ''}
						/>
						<SocialButtons
							url={this.props.location.pathname}
							title={this.state.event.title}
						/>
						<div>
							{ReactHtmlParser(this.state.event.content)}
						</div>
					</div>
				) : (
					<Loading />
				)}
			</StyledContainer>
		);
	}
}

export default EventSingle;
