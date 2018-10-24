import React, { Component } from "react";
import { Container, Grid, Icon, Button, Segment } from "semantic-ui-react";
import {
	InstantSearch,
	InfiniteHits,
	SearchBox,
	Stats,
	Configure
} from "react-instantsearch-dom";
import styled from "styled-components";
import Expositor from "./Expositor";


const searchBoxTranslations = {
	submitTitle: "Buscar",
	resetTitle: "Limpiar",
	placeholder: "Buscar expositores"
};

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

class BuscaExpositores extends Component {
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
					indexName="filsaexpositores"
				>
					<Configure hitsPerPage={20} />
					<Grid>
						<Grid.Column width={16}>
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
											`${n} expositores encontrados`
									}}
								/>
							</Segment>

							<StyledHits
								hitComponent={Expositor}
								translations={{ loadMore: "Cargar más" }}
							/>
						</Grid.Column>
					</Grid>
				</InstantSearch>
			</Container>
		);
	}
}

export default BuscaExpositores;
