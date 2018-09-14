import React, { Component } from "react";
import { Container, Select, Tab } from "semantic-ui-react";
import Loading from "./Loading";
import Event from "./Event";
import Dias from "./Dias";
import api from "../utils/api";

class VisitasGuiadas extends Component {
	constructor(props) {
		super(props);
		let today = new Date();
		let year = today.toLocaleDateString("en-US", { year: "numeric" });
		let day = today.toLocaleDateString("en-US", { day: "2-digit" });
		let month = today.toLocaleDateString("en-US", { month: "2-digit" });
		this.state = {
			events: null,
			curday: null,
			curcurso: null,
			today: `${year}-${month}-${day}`
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
						<Event
							key={evento.id}
							title={evento.title}
							fullday={evento.daykey}
							data={evento}
							formurl={this.state.events.formurl}
						/>
					);
				} else {
					return null;
				}
			});
		}
		return evento;
	}

	eventosPorCurso() {
		let evento;
		if (this.state.curcurso !== null) {
			evento = this.state.events.eventos.map(evento => {
				if (evento.cursos.includes(this.state.curcurso)) {
					return (
						<Event
							key={evento.id}
							title={evento.title}
							fullday={evento.daykey}
							data={evento}
							formurl={this.state.events.formurl}
						/>
					);
				} else {
					return null;
				}
			});
		}
		return evento;
	}

	handleChange(event, curso) {
		this.setState({
			curcurso: curso.value
		})
	}

	cursos() {
		if (this.state.events !== null) {
			let options = this.state.events.cursos.map(curso => {
				return { text: curso.name, value: curso.name };
			});
			const { curcurso } = this.state;
			return (
				<Select
					placeholder="Escoge un curso"
					options={options}
					onChange={this.handleChange.bind(this)}
					value={curcurso}
				/>
			);
		}
	}

	render() {
		const loading = this.state.events !== null;
		const panes = [
			{menuItem: 'Por día', render: () => <Tab.Pane>
						<h2>Por día</h2>
						{this.dias()}
						{this.eventos()}
						</Tab.Pane>},
			{menuItem: 'Por curso', render: () => <Tab.Pane>
						<h2>Por curso</h2>
						{this.cursos()}
						{this.eventosPorCurso()}
						</Tab.Pane>},
			{menuItem: 'Por tipo de evento', render: () => <Tab.Pane>
						<h2>Por tipo de evento</h2>
						{this.cursos()}
						</Tab.Pane>}
		]
		return (
			<div>
				{loading ? (
					<Container>
						<Tab menu={{ fluid: true, vertical: true, tabular: 'right'}} panes={panes}/>
					</Container>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

export default VisitasGuiadas;
