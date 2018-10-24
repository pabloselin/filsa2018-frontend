import React, { Component } from "react";
import { Container, Grid, Icon, Button, Segment } from "semantic-ui-react";
import {
	InstantSearch,
	InfiniteHits,
	SearchBox,
	RefinementList,
	Stats,
	Configure
} from "react-instantsearch-dom";
import styled from "styled-components";
import Libro from "./Libro";

const refinementTranslations = {
	showMore: "Ver más"
};

const searchBoxTranslations = {
	submitTitle: "Buscar",
	resetTitle: "Limpiar",
	placeholder: "Buscar libros"
};

const StyledRefinementList = styled(RefinementList)`
	.ais-RefinementList-showMore {
		display: block;
		padding: 6px 12px;
		background-color: #555;
		border-radius: 5px;
		margin: 12px 0;
		color: white;
		font-size: 14px;
	}

	.ais-RefinementList-item {
		margin-bottom: 6px;
		input {
			margin-right: 6px;
		}
		.ais-RefinementList-count {
			font-size: 12px;
			&:before {
				content: "(";
			}
			&:after {
				content: ")";
			}
		}
	}
`;

const StyledSearchBox = styled(SearchBox)`
	input {
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 12px;
		margin-right: 12px;
		&:focus {
			outline: 0;
			box-shadow: 0 0 4px #9dd6f4;
		}
	}
`;

const StyledHits = styled(InfiniteHits)`
	.ais-InfiniteHits-loadMore {
		display: block;
		padding: 12px;
		color: white;
		background-color: #cc1012;
		margin: 12px 0;
		font-weight: bold;
		border-radius: 6px;
	}
`;

class BuscaLibros extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventos: null
		};
	}

	handleEmpty(items) {
		for (let i = 0; i < items.length; i++) {
			if (items[i].label === ".") {
				items[i].label = "NINGUNO";
			}
		}
		return items;
	}

	render() {
		return (
			<Container>
				<InstantSearch
					appId="EWYXCBT7ZL"
					apiKey="158402c8a8f3278e4ae6e96924577c01"
					indexName="filsalibros"
				>
					<Configure hitsPerPage={20} />
					<Grid>
						<Grid.Column computer={10} mobile={16}>
							<StyledSearchBox
								searchAsYouType={false}
								placeholder="Buscar"
								translations={searchBoxTranslations}
								submit={
									<Button icon color="red" as="span">
										<Icon name="search" /> Buscar
									</Button>
								}
								reset={
									<Button icon color="blue" as="span">
										<Icon name="close" /> Limpiar
									</Button>
								}
							/>
							<Segment>
								<Stats
									translations={{
										stats: (n, ms) =>
											`${n} libros encontrados`
									}}
								/>
							</Segment>

							<StyledHits
								hitComponent={Libro}
								translations={{ loadMore: "Cargar más" }}
							/>
						</Grid.Column>
						<Grid.Column computer={6} mobile={16}>
							<h3>
								<Icon name="book" /> Editorial
							</h3>
							<StyledRefinementList
								attribute="EDITORIAL"
								showMore={true}
								translations={refinementTranslations}
								transformItems={this.handleEmpty}
							/>
							<h3>
								<Icon name="warehouse" /> Expositor
							</h3>
							<StyledRefinementList
								attribute="EXPOSITOR"
								showMore={true}
								translations={refinementTranslations}
								transformItems={this.handleEmpty}
							/>
							<h3>
								<Icon name="tag" /> Materia
							</h3>
							<StyledRefinementList
								attribute="MATERIA"
								showMore={true}
								translations={refinementTranslations}
								transformItems={this.handleEmpty}
							/>
						</Grid.Column>
					</Grid>
				</InstantSearch>
			</Container>
		);
	}
}

export default BuscaLibros;
