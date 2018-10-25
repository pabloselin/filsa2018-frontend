import React, { Component, Fragment } from "react";
import { Tab } from "semantic-ui-react";
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
				menuItem: "Hoy en FILSA",
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
				menuItem: "Mañana en FILSA",
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
			}
		];
		return <Tab menu={{ pointing: true }} panes={panes} />;
	}
}

export default HomeEventos;
