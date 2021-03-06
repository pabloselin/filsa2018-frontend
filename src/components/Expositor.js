import React, { Component } from "react";
import { Card, Label, Icon, List, Button, Grid } from "semantic-ui-react";
import Image from "react-graceful-image";
import styled from "styled-components";
import config from "../config.json";
import env from "../utils/env";

const node_env = env();
const rutalogos =
	config[node_env].service_worker_url + "/wp-content/uploads/2018/10/";

const ExtraExpositor = styled(Card.Content)`
	&& {
		font-size: 14px;
		.list {
			margin-top: 12px;
			.item {
				margin-bottom: 6px;
			}
		}
	}
`;

const ExpoHeader = styled(Card.Header)`
	&&&&&& {
		h2 {
			color: #cc1012;
			font-weight: 700;
			font-size: 18px;
			font-family: "Maitree", serif;
			margin-bottom: 12px;
		}
	}
`;

const ExpoCard = styled(Card)`
	&&&& {
		margin-bottom: 12px;
	}
`;

const LazyImage = styled(Image)`
	max-width: 130px;
	height: auto;
	float: right;
	@media screen and (max-width:768px) {
		max-width: 60px;
	}
`;

class Expositor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDesc: false
		};
	}

	handleStand(stands) {
		let standStr = stands.toString();
		let standItems = standStr.split(",");
		//console.log(standStr.split(','));
		return standItems.map((stand, key) => (
			<Label key={key} color={this.handleLabelColor(stand)}>
				{stand}
			</Label>
		));
	}

	handleTags(tags) {
		let tagStr = tags.toString();
		let tagItems = tagStr.split(",");
		//console.log(tagStr.split(','));
		return tagItems.map((tag, key) => <Label key={key}>{tag}</Label>);
	}

	handleLabelColor(stand) {
		let color = "brown";
		if (Number.parseInt(stand, 10)) {
			if (stand < 16) {
				color = "blue";
			} else if (stand < 64) {
				color = "grey";
			} else {
				color = "teal";
			}
		}
		return color;
	}

	showDesc() {
		this.setState({
			showDesc: this.state.showDesc ? false : true
		});
	}

	render() {
		const showDesc = this.state.showDesc ? (
			<Button
				icon
				size="tiny"
				title="cerrar"
				onClick={this.showDesc.bind(this)}
			>
				<Icon name="minus" /> info
			</Button>
		) : (
			<Button
				icon
				size="tiny"
				title="Ver más"
				onClick={this.showDesc.bind(this)}
			>
				<Icon name="plus" /> info
			</Button>
		);

		const expositorlogo = name => {
			name = name.toLowerCase();
			name = name.replace(/\s+/g, "-");
			name = name.replace(/&+/g, "");
			name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			name = rutalogos + name + ".png";
			return name;
		};

		const extraInfo =
			this.props.hit.DIRECCION ||
			this.props.hit.CORREO ||
			this.props.hit.TELEFONO ||
			this.props.hit.WEB ||
			this.props.hit.CARGOS ||
			this.props.hit.ACTIVIDAD ||
			this.props.hit.SELLOS ||
			this.props.hit.MATERIAS
				? true
				: false;

		return (
			<ExpoCard fluid>
				<Card.Content>
					<Grid>
						<Grid.Column as={ExpoHeader} width={10}>
							<h2>{this.props.hit.EXPOSITOR}</h2>
							<List>
								<Icon name="map outline" /> Stand(s):{" "}
								{this.handleStand(this.props.hit.STAND)}
							</List>
						</Grid.Column>
						<Grid.Column width={6}>
							<LazyImage
								placeholderColor="transparent"
								src={expositorlogo(this.props.hit.EXPOSITOR)}
								noRetry={true}
							/>
						</Grid.Column>
					</Grid>
					{this.state.showDesc && (
						<ExtraExpositor>
							<List>
								{this.props.hit.TELEFONO && (
									<List.Item>
										<List.Icon name="phone" />{" "}
										<List.Content>
											<a
												href={`tel:${
													this.props.hit.TELEFONO
												}`}
											>
												{" "}
												{this.props.hit.TELEFONO}
											</a>
										</List.Content>
									</List.Item>
								)}
								{this.props.hit.CORREO && (
									<List.Item>
										<List.Icon name="mail" />{" "}
										<List.Content>
											<a
												target="_blank"
												rel="noopener noreferrer"
												href="mailto:{this.props.hit.CORREO}"
											>
												{this.props.hit.CORREO}
											</a>
										</List.Content>
									</List.Item>
								)}

								{this.props.hit.WEB && (
									<List.Item>
										<List.Icon name="world" />
										<List.Content>
											<a href={this.props.hit.WEB}>
												{this.props.hit.WEB}
											</a>
										</List.Content>
									</List.Item>
								)}
								{this.props.hit.DIRECCION && (
									<List.Item>
										<List.Icon name="map marker" />
										<List.Content>
											{this.props.hit.DIRECCION}.{" "}
											{this.props.hit.CIUDAD},{" "}
											{this.props.hit.PAIS}
										</List.Content>
									</List.Item>
								)}

								{this.props.hit.CARGOS && (
									<List.Item>
										<List.Icon name="id card" />
										<List.Content>
											Cargos: {this.props.hit.CARGOS}
										</List.Content>
									</List.Item>
								)}
								{this.props.hit.ACTIVIDAD && (
									<List.Item>
										<List.Icon name="briefcase" />
										<List.Content>
											Actividad:{" "}
											{this.props.hit.ACTIVIDAD}
										</List.Content>
									</List.Item>
								)}
								{this.props.hit.SELLOS && (
									<List.Item>
										<List.Icon name="bookmark" />
										<List.Content>
											Sellos:{" "}
											{this.handleTags(
												this.props.hit.SELLOS
											)}
										</List.Content>
									</List.Item>
								)}
								{this.props.hit.MATERIAS && (
									<List.Item>
										<List.Icon name="tag" />
										<List.Content>
											Materias:{" "}
											{this.handleTags(
												this.props.hit.MATERIAS
											)}
										</List.Content>
									</List.Item>
								)}
							</List>
						</ExtraExpositor>
					)}
				</Card.Content>
				{extraInfo && <Card.Content extra>{showDesc}</Card.Content>}
			</ExpoCard>
		);
	}
}

export default Expositor;
