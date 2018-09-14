import React, { Component } from "react";
import styled from "styled-components";

const DiaNumero = styled.span`
	display: block;
	font-weight: bold;
	font-size: 16px;
`;

const DayBox = styled.span`
	display: inline-block;
	cursor: pointer;
	padding: 4px;
	font-size: 13px;
	border: 1px solid #ccc;
	border-right: 0;
	text-align: center;
	width: 56px;
	&.disabled, &.disabled:hover {
		cursor: default;
		color: #ccc;
		background-color: #f0f0f0;
		display: none;
	}
	&:last-child {
		border-right: 1px solid #ccc;
	}
	&:hover, &.enabled {
		background-color: #f1eada;
		color: #cc1011;
	}
	@media screen and (max-width: 768px) {
		width: 40px;
		border: 1px solid #ccc;
		margin: 3px;
	}
`;

class Day extends Component {

	parseWeekDay(day) {
		let dia = new Date(day);
		return dia.toLocaleDateString('es-ES', {weekday: 'short'});
	}

	render() {
		return (
			<DayBox
				className={`${this.props.dia[1]} ${this.props.enabled}`}
				onClick={() => this.props.trigger(this.props.dia[0].full)}
			>
				{this.parseWeekDay(this.props.dia[0].full)}
				<DiaNumero>{this.props.dia[0].dia}</DiaNumero>
			</DayBox>
		);
	}
}

export default Day;
