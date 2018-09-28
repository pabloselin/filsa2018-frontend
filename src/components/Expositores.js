import React, { Component } from "react";
import { Container, Input, Segment } from "semantic-ui-react";
import api from "../utils/api";
import _ from "lodash";
import Loading from "./Loading";
import Expositor from "./Expositor";

class Expositores extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expositores: null,
			searchfield: null,
			filteredexpositores: null
		};
	}

	componentDidMount() {
		api.get("/filsa2018/v1/expositores/").then(res => {
			this.setState({
				expositores: res.data
			});
		});
	}

	handleSearch(ev, data) {
		const re = new RegExp(_.escapeRegExp(data.value), "i");
		const isMatch = result => re.test(result.title);
		const match = _.filter(this.state.expositores, isMatch);
		this.setState({
			searchfield: data.value,
			filteredexpositores: match
		});
	}

	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				{this.state.expositores !== null ? (
					<Container>
						<Segment padded secondary>
						<Input
							onChange={this.handleSearch.bind(this)}
							icon="search"
							placeholder="Buscar expositor..."
						/>
						</Segment>
						{this.state.filteredexpositores !== null
							? this.state.filteredexpositores.map(
									(expositor, key) => (
										<Expositor key={key} data={expositor} />
									)
							  )
							: this.state.expositores.map((expositor, key) => (
									<Expositor key={key} data={expositor} />
							  ))}
					</Container>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

export default Expositores;
