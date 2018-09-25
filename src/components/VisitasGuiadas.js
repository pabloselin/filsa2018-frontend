import React, { Component } from "react";
import { Container, Select, Tab, Responsive } from "semantic-ui-react";
import styled from "styled-components";
import Loading from "./Loading";
import Event from "./Event";
import Dias from "./Dias";
import api from "../utils/api";

const StyledTabPane = styled(Tab.Pane)`
	&&&& {
		border-width: 1px 0 0 0;
	}
	@media screen and (max-width: 769px) {
		&&&& {
			border-width: 0;
			padding: 12px 0 0 0;
		}
	}
`;

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
			curtipo: null,
			today: `${year}-${month}-${day}`
		};
	}

	componentDidMount() {
		api.get("/filsa2018/v1/visitas-guiadas/").then(res => {
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
							cerrado={evento.cerrado}
							showday={false}
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
							cerrado={evento.cerrado}
							showday={true}
						/>
					);
				} else {
					return null;
				}
			});
		}
		return evento;
	}

	eventosPorTipo() {
		let evento;
		if (this.state.curtipo !== null) {
			evento = this.state.events.eventos.map(evento => {
				if (evento.tipo_eventos.includes(this.state.curtipo)) {
					return (
						<Event
							key={evento.id}
							title={evento.title}
							fullday={evento.daykey}
							data={evento}
							formurl={this.state.events.formurl}
							cerrado={evento.cerrado}
							showday={true}
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
		});
	}

	handleChangeTipo(event, tipo) {
		this.setState({
			curtipo: tipo.value
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
					showday={true}
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
		const panes = [
			{
				menuItem: {
					content: "Por día",
					icon: "calendar alternate outline",
					key: "por-dia"
				},
				render: () => (
					<StyledTabPane>
						{this.dias()}
						{this.eventos()}
					</StyledTabPane>
				)
			},
			{
				menuItem: {
					content: "Por curso",
					icon: "users",
					key: "por-curso"
				},
				render: () => (
					<StyledTabPane>
						{this.cursos()}
						{this.eventosPorCurso()}
					</StyledTabPane>
				)
			},
			{
				menuItem: {
					content: "Por tipo",
					icon: "tags",
					key: "por-tipo"
				},
				render: () => (
					<StyledTabPane>
						{this.tipos()}
						{this.eventosPorTipo()}
					</StyledTabPane>
				)
			}
		];
		return (
			<div>
				{loading ? (
					<Container>
						<Responsive {...Responsive.onlyComputer}>
							<Tab
								menuPosition="left"
								menu={{
									fluid: true,
									vertical: true,
									pointing: true
								}}
								panes={panes}
							/>
						</Responsive>
						<Responsive {...Responsive.onlyMobile}>
							<Tab
								menu={{
									fluid: true,
									pointing: true,
									borderless: true
								}}
								panes={panes}
							/>
						</Responsive>
					</Container>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

export default VisitasGuiadas;
