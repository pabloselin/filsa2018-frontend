import React, { Component } from "react";
import { Card, Icon } from "semantic-ui-react";
import styled from "styled-components";

const LibroCard = styled(Card)`
	&&&& {
		margin: 12px 0;
	}
`;

const BookTitle = styled(Card.Header)`
	&&&&&& {
		color: #cc1011;
	}
`;

const StyledCardMeta = styled(Card.Meta)`
	&&& {
		margin-bottom: 12px;
		color: #333;
	}
`;

const AuthorMeta = styled(Card.Meta)`
	&&& {
		margin-bottom: 12px;
	}
`;

class LibroMini extends Component {
	filterStands(stand) {
		let str = stand.toString();
		return str.replace("EL", "");
	}

	render() {
		return (
			<LibroCard fluid>
				<Card.Content>
					<BookTitle>{this.props.hit.MATERIAL}</BookTitle>
					<AuthorMeta><Icon name="user outline" /> Autor/a: {this.props.hit.AUTOR}</AuthorMeta>

					{this.props.hit.EXPOSITOR !== "." && (
						<StyledCardMeta>
							<Icon name="home" /> Expositor: {this.props.hit.EXPOSITOR}
						</StyledCardMeta>
					)}

					<StyledCardMeta>
						<Icon name="map outline" /> Stand:{" "}
						{this.filterStands(this.props.hit.STAND)}
					</StyledCardMeta>
				</Card.Content>

			</LibroCard>
		);
	}
}

export default LibroMini;
