import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import Day from "./Day.js";

const MesH = styled.h2`
	margin: 0;
	text-transform: uppercase;
	font-size: 14px;
`;

const DaysWrap = styled.div`
	margin-top: 12px;
`;

class Dias extends Component {
	render() {
		return (
			<Grid>
				<Grid.Column computer={6} mobile={16}>
					<MesH>Octubre</MesH>
					<DaysWrap>
						{this.props.dias.octubre.map((dia, key) => (
							<Day
								key={key}
								trigger={this.props.trigger}
								dia={dia}
								enabled={
									this.props.curday === dia[0].full
										? "enabled"
										: false
								}
							/>
						))}
					</DaysWrap>
				</Grid.Column>
				<Grid.Column computer={10} mobile={16}>
					<MesH>Noviembre</MesH>
					<DaysWrap>
						{this.props.dias.noviembre.map((dia, key) => (
							<Day
								key={key}
								trigger={this.props.trigger}
								dia={dia}
								enabled={
									this.props.curday === dia[0].full
										? "enabled"
										: false
								}
							/>
						))}
					</DaysWrap>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Dias;
