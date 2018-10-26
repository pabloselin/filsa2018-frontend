import React, { Component } from "react";
import { Container, Select, Divider } from "semantic-ui-react";
import styled from "styled-components";
import Loading from "./Loading";
import Event from "./Event";
import Dias from "./Dias";
import api from "../utils/api";


const StyledContainer = styled(Container)`
	&&& {
		@media only screen and (min-width: 1213px) {
			width: 950px;
		}
	}
`;

class FirmaAutores extends Component {
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
			curtipo: null,
			today: `${year}-${month}-${day}`,
			showing: 0,
			showEvents: null,
			curfilter: null
		};
	}

	componentDidMount() {
		api.get("/filsa2018/v1/firma-de-autores/")
			.then(res => {
				this.setState({
					events: res.data
				});
			})
			.catch(error => console.log(error));
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.events !== prevState.events) {
			this.filterEvents(this.state.today);
		}
	}

	dias() {
		if (this.state.events.diasfirmas !== null) {
			return (
				<Dias
					trigger={this.changecurDay.bind(this)}
					dias={this.state.events.diasfirmas}
					curday={this.state.curday}
				/>
			);
		}
	}

	filterEvents(day) {
		let eventosFiltrados = this.state.events.eventos.filter(
			evento => evento.daykey === day
		);
		this.setState({
			showEvents: eventosFiltrados,
			showing: eventosFiltrados.length,
			curday: day,
			curfilter: "por-dia"
		});
	}

	filterCurso(curso) {
		let eventosFiltrados = this.state.events.eventos.filter(evento =>
			evento.cursos.includes(curso.value)
		);
		this.setState({
			showEvents: eventosFiltrados,
			showing: eventosFiltrados.length,
			curcurso: curso.value,
			curfilter: "por-curso"
		});
	}

	filterTipo(tipo) {
		let eventosFiltrados = this.state.events.eventos.filter(evento =>
			evento.tipo_eventos.includes(tipo.value)
		);
		this.setState({
			showEvents: eventosFiltrados,
			showing: eventosFiltrados.length,
			curtipo: tipo.value,
			curfilter: "por-tipo"
		});
	}

	changecurDay(day) {
		this.filterEvents(day);
	}

	handleChange(event, curso) {
		this.filterCurso(curso);
	}

	handleChangeTipo(event, tipo) {
		this.filterTipo(tipo);
	}

	resetEvents(event, tab) {
		this.setState({
			showEvents: null,
			showing: 0,
			curday: null,
			curcurso: null,
			curtipo: null
		});
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

	tipos() {
		if (this.state.events !== null) {
			let tiposarray = Object.values(this.state.events.tipoevento);
			let options = tiposarray.map((tipo, key) => {
				return { text: tipo, value: tipo };
			});
			const { curtipo } = this.state;
			return (
				<Select
					placeholder="Escoge un tipo de evento"
					options={options}
					onChange={this.handleChangeTipo.bind(this)}
					value={curtipo}
				/>
			);
		}
	}

	render() {
		const loading = this.state.events !== null;
		const showEventsTitle = <h3>{this.state.showing} actividades</h3>;
		const showEvents = this.state.showEvents
			? this.state.showEvents.map((evento, key) => (
					<Event
						key={key}
						id={evento.id}
						title={evento.title}
						fullday={evento.daykey}
						data={evento}
						cerrado={evento.cerrado}
						showday={
							this.state.curfilter !== "por-dia" ? true : false
						}
					/>
			  ))
			: null;
		return (
			<div>
				{loading ? (
					<StyledContainer text>
						{this.dias()}
						{showEventsTitle}
						{showEvents}
						<Divider hidden />
					</StyledContainer>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

export default FirmaAutores;
