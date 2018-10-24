import React, { Component } from "react";
import { Container, Tab, Responsive, Divider } from "semantic-ui-react";
import styled from "styled-components";
import Loading from "./Loading";
import Event from "./Event";
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

const StyledContainer = styled(Container)`
	&&& {
		@media only screen and (min-width: 1213px) {
			width: 950px;
		}
	}
`;

const MobileTab = styled(Tab)`
	&&&& {
		.ui.menu.fluid {
			display: flex;
			flex-wrap: wrap;
			a {
				text-align: center;
				flex-grow: 1;
			}
		}
	}
`;

class Jornadas extends Component {
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
		api.get("/filsa2018/v1/jornadas/")
			.then(res => {
				this.setState({
					events: res.data
				});
			})
			.catch(error => console.log(error));
	}

	resetEvents(event, tab) {
		let type = tab.panes[tab.activeIndex].menuItem.key;

		api.get("/filsa2018/v1/" + type)
			.then(res => {
				this.setState({
					events: res.data,
					showEvents: null,
					showing: 0,
					curday: null
				});
			})
			.catch(error => console.log(error));
	}

	mapEvents(type) {
		let eventos = null;
		if (this.state.events !== null) {
			eventos = this.state.events[type].eventos.map((evento, key) => (
				<Event
					key={evento.id}
					title={evento.title}
					fullday={evento.daykey}
					data={evento}
					cerrado={evento.cerrado}
					showday={this.state.curfilter !== "por-dia" ? true : false}
				/>
			));
		}
		return eventos;
	}

	render() {
		const loading = this.state.events !== null;

		const panes = [
			{
				menuItem: {
					content: "Fomento lector y Educación",
					icon: "tags",
					key: "fomento"
				},
				render: () => (
					<StyledTabPane>
						<h2>Lunes 29 de Octubre: Jornada de Fomento lector y Educación</h2>
						{this.mapEvents('fomento')}
					</StyledTabPane>
				)
			},
			{
				menuItem: {
					content: "Jornada de Edición",
					icon: "tags",
					key: "edicion"
				},
				render: () => (
					<StyledTabPane>
						<h2>Martes 30 de Octubre: Jornada de Edición</h2>
						{this.mapEvents('edicion')}
					</StyledTabPane>
				)
			},
			{
				menuItem: {
					content: "Jornada de Ilustración",
					icon: "tags",
					key: "ilustracion"
				},
				render: () => (
					<StyledTabPane>
						<h2>Lunes 29 de Octubre: Jornada de Ilustración</h2>
						{this.mapEvents('ilustracion')}
					</StyledTabPane>
				)
			}
		];
		return (
			<div>
				{loading ? (
					<StyledContainer>
						<Responsive {...Responsive.onlyComputer}>
							<Tab
								onTabChange={this.resetEvents.bind(this)}
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
							<MobileTab
								onTabChange={this.resetEvents.bind(this)}
								menu={{
									fluid: true,
									pointing: false,
									borderless: true,
								}}
								panes={panes}
							/>
						</Responsive>
						<Divider hidden />
					</StyledContainer>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

export default Jornadas;
