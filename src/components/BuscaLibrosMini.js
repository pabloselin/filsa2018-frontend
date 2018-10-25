import React, { Component, Fragment } from "react";
import {
	Container,
	Grid,
	Icon,
	Button,
	Segment,
	Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
	InstantSearch,
	InfiniteHits,
	SearchBox,
	Stats,
	Configure,
	connectStateResults
} from "react-instantsearch-dom";
import styled from "styled-components";
import LibroMini from "./LibroMini";

const searchBoxTranslations = {
	submitTitle: "Buscar",
	resetTitle: "Limpiar",
	placeholder: "Buscar libros"
};

const StyledSearchBox = styled(SearchBox)`
	input {
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 12px;
		margin-right: 12px;
		margin-bottom: 12px;
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

const BuscadorHeader = styled.h2`
	font-size: 18px;
	color: #cc1012;
`;

class BuscaLibrosMini extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventos: null,
			query: null
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
		const SearchContent = connectStateResults(
			({ searchState, searchResults }) => {
				if (searchState.query !== undefined) {
					return (
						<Fragment>
							<Segment>
								<Stats
									translations={{
										stats: (n, ms) =>
											`${n} libros encontrados`
									}}
								/>
							</Segment>
							<StyledHits
								hitComponent={LibroMini}
								translations={{ loadMore: "Cargar más" }}
							/>
						</Fragment>
					);
				} else {
					return (
						<Segment>
							<Icon name="hand point up outline" /> Busca un libro
							por título, autor, editorial o materia...<br />
							<Stats
								translations={{
									stats: (n, ms) =>
										`${n} libros que buscar...`
								}}
							/>
						</Segment>
					);
				}
			}
		);
		return (
			<Container>
				<BuscadorHeader>
					<Icon name="book" /> ¡Encuentra tu libro en FILSA 2018!
				</BuscadorHeader>
				<InstantSearch
					appId="EWYXCBT7ZL"
					apiKey="158402c8a8f3278e4ae6e96924577c01"
					indexName="filsalibros"
				>
					<Configure hitsPerPage={2} />
					<Grid>
						<Grid.Column computer={16} mobile={16}>
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
							<SearchContent />
						</Grid.Column>
					</Grid>
				</InstantSearch>
				<Divider hidden />
				<Button
					fluid
					basic
					icon
					color="red"
					as={Link}
					to="/encuentra-tu-libro/"
				>
					<Icon.Group>
						<Icon name="book" />
						<Icon corner name="add" />
					</Icon.Group>{" "}
					Ir a buscador avanzado
				</Button>
			</Container>
		);
	}
}

export default BuscaLibrosMini;
