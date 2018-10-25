import React, { Component, Fragment } from "react";
import {
	Tab,
	Menu,
	Label,
	Responsive,
	Button,
	Icon,
	Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import EventMini from "./EventMini";

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

date.setDate(date.getDate() + 1);

const tday = date.getDate();
const tmonth = date.getMonth() + 1;
const tyear = date.getFullYear();

const StyledSlider = styled(Slider)`
	&&& {
		.slick-dots {
			bottom: -40px;
		}

		.slick-dots li button:before {
			font-size: 12px;
		}

		.slick-prev:before,
		.slick-next:before {
			color: #cc1012;
			background-color: white;
			font-size: 20px;
		}
	}
`;

class HomeEventos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			today: `${year}-${month}-${day}`,
			tomorrow: `${tyear}-${tmonth}-${tday}`
		};
	}

	componentDidMount() {}

	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: false
					}
				}
			]
		};

		const todayEvents = this.props.eventos[this.state.today].map(
			(evento, key) => (
				<EventMini
					key={evento.id}
					title={evento.title}
					fullday={evento.daykey}
					data={evento}
					cerrado={evento.cerrado}
					showday={false}
				/>
			)
		);

		const tomorrowEvents = this.props.eventos[this.state.tomorrow].map(
			(evento, key) => (
				<EventMini
					key={evento.id}
					title={evento.title}
					fullday={evento.daykey}
					data={evento}
					cerrado={evento.cerrado}
					showday={false}
				/>
			)
		);

		const panes = [
			{
				menuItem: (
					<Menu.Item key="today">
						<span>Hoy</span>
						<Responsive {...Responsive.onlyComputer}>
							&nbsp;
							en FILSA
						</Responsive>
						<Label>
							{this.props.eventos[this.state.today].length}
						</Label>
					</Menu.Item>
				),
				render: () => (
					<Tab.Pane>
						{this.props.eventos[this.state.today].length > 3 ? (
							<StyledSlider {...settings}>
								{todayEvents}
							</StyledSlider>
						) : (
							<Fragment>{todayEvents}</Fragment>
						)}
					</Tab.Pane>
				)
			},
			{
				menuItem: (
					<Menu.Item key="tomorrow">
						<span>Mañana</span>
						<Responsive {...Responsive.onlyComputer}>
							&nbsp;
							en FILSA
						</Responsive>
						<Label>
							{this.props.eventos[this.state.tomorrow].length}
						</Label>
					</Menu.Item>
				),
				render: () => (
					<Tab.Pane>
						{this.props.eventos[this.state.tomorrow].length > 3 ? (
							<StyledSlider {...settings}>
								{tomorrowEvents}
							</StyledSlider>
						) : (
							<Fragment>{tomorrowEvents}</Fragment>
						)}
					</Tab.Pane>
				)
			},
			{
				menuItem: (
					<Fragment key="programcomputer">
						<Responsive {...Responsive.onlyComputer}>
							<Menu.Item
								key="program"
								as={Link}
								to="/programa-cultural/programacion/"
							>
								<Icon name="calendar" /> Programación
							</Menu.Item>
						</Responsive>
					</Fragment>
				),
				render: () => ""
			}
		];
		return (
			<Fragment>
				<Tab menu={{ pointing: true }} panes={panes} />
				<Responsive {...Responsive.onlyMobile}>
					<Divider hidden />
					<Button
						as={Link}
						to="/programa-cultural/programacion/"
						basic
						fluid
						color="red"
						icon
					>
						<Icon name="arrow right" /> Ir a Programación
					</Button>
				</Responsive>
			</Fragment>
		);
	}
}

export default HomeEventos;
