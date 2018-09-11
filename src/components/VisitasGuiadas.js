import React, { Component } from "react";
import Loading from "./Loading";
import Event from "./Event";
import Dias from "./Dias";
import api from "../utils/api";

class VisitasGuiadas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: null,
			curday: null
		};
	}

	componentDidMount() {
		api.get("/filsa2018/v1/events/").then(res => {
			this.setState({
				events: res.data
			});
		});
	}

	changecurDay(day) {
		this.setState({
			curday: day
		});
	}

	dias() {
		if (this.state.events.diasvisitasguiadas !== null) {
			return (
				<Dias
					trigger={this.changecurDay.bind(this)}
					dias={this.state.events.diasvisitasguiadas}
					curday={this.state.curday}
				/>
			);
		}
	}

	eventos() {
		let evento;
		if (this.state.curday !== null) {
			evento = this.state.events.eventos.map(evento => {
				if (evento.daykey === this.state.curday) {
					return (
						<Event key={evento.id} title={evento.title} fullday={evento.daykey} data={evento} />
						)
				} else {
					return null;
				}
			});
		}
		return evento;
	}

	render() {
		const loading = this.state.events !== null;
		return (
			<div>
				{loading ? (
					<div>
						{this.dias()}
						{this.eventos()}
					</div>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

export default VisitasGuiadas;
