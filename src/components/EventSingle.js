import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Loading from "./Loading";
import SocialButtons from "./SocialButtons";
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
			formurl: null,
			seotitle: null,
			visitaguiada: false
		};
	}

	componentDidMount() {
		api.get("/filsa2018/v1/events/" + this.props.match.params.slug).then(
			res => {
				let seotitle = res.data.title + " - FILSA 2018";

				this.setState({
					event: res.data,
					seotitle: seotitle
				});
				trackPage(this.props.location.pathname, seotitle);
				if (res.data.tipo_eventos.includes("Visitas de colegios")) {
					this.setState({
						visitaguiada: true
					});
				}
			}
		);
		api.get("/filsa2018/v1/options/filsa2018_formurl").then(res => {
			this.setState({
				formurl: res.data
			});
		});
	}

	render() {
		const loading = this.state.event !== null;
		return (
			<StyledContainer text>
				{loading ? (
					<div>
						<Event
							key={this.state.event.id}
							id={this.state.event.id}
							title={this.state.event.title}
							fullday={this.state.event.daykey}
							data={this.state.event}
							cerrado={this.state.event.cerrado}
							single={true}
							showday={true}
							formurl={
								this.state.formurl !== null &&
								this.state.formurl !== false
									? this.state.formurl
									: ""
							}
							visitaguiada={this.state.visitaguiada}
						/>
						<SocialButtons
							url={this.props.location.pathname}
							title={this.state.seotitle}
						/>
					</div>
				) : (
					<Loading />
				)}
			</StyledContainer>
		);
	}
}

export default EventSingle;
