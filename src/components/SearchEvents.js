import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
import { Search } from "semantic-ui-react";
import Event from "./Event";

const ResultsBox = styled.div`
	margin-top: 32px;
`;

const TitleResults = styled.h2`
	color: #cc1012;
`;

class SearchEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillMount() {
		this.resetComponent();
	}

	componentDidMount() {}

	resetComponent = () =>
		this.setState({ isLoading: false, results: [], value: "" });

	handleResultSelect = (e, { result }) =>
		this.setState({ value: result.title });

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value });
		setTimeout(() => {
			if (this.state.value.length < 1) {
				return this.resetComponent();
			} else if (this.state.value.length > 2) {
				const re = new RegExp(_.escapeRegExp(this.state.value), "i");
				const isMatch = result =>
					re.test(
						result.title + result.description + result.organizadores
					);

				this.setState({
					isLoading: false,
					results: _.filter(this.props.events.eventos, isMatch)
				});
			}
		}, 300);
	};

	handleMessages() {
		let message;
		if (this.state.value.length > 1 && this.state.value.length < 3) {
			message = "Tu búsqueda debería tener 3 letras o más";
		} else if (
			this.state.value.length >= 3 &&
			this.state.results.length === 0
		) {
			message =
				"No se encontraron eventos que coincidieran con " +
				this.state.value;
		} else {
			message =
				"Busca algo! Puedes buscar por título del evento, contenido del evento o organizador.";
		}

		return message;
	}

	render() {
		const { isLoading, value, results } = this.state;
		return (
			<div>
				<Search
					fluid
					loading={isLoading}
					onResultSelect={this.handleResultSelect}
					onSearchChange={_.debounce(this.handleSearchChange, 500, {
						leading: true
					})}
					open={false}
					results={results}
					value={value}
				/>
				<ResultsBox>
					{this.state.results.length > 0 ? (
						<div>
							<TitleResults>
								{this.state.results.length} resultados para{" "}
								{this.state.value}
							</TitleResults>
							{this.state.results.map((evento, key) => (
								<Event
									key={key}
									title={evento.title}
									fullday={evento.daykey}
									data={evento}
									cerrado={evento.cerrado}
									showday={true}
									highlight={this.state.value}
								/>
							))}
						</div>
					) : (
						this.handleMessages()
					)}
				</ResultsBox>
			</div>
		);
	}
}

export default SearchEvents;
