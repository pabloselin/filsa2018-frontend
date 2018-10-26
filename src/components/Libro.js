import React, { Component, Fragment } from "react";
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

const StyledExtra = styled(Card.Content)`
	&&& {
		font-size: 12px;
	}
`;

const AuthorMeta = styled(Card.Meta)`
	&&& {
		margin-bottom: 12px;
	}
`;

const ISBN = styled.div`
	float: right;
`;

class Libro extends Component {
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
					{(this.props.hit.EDITORIAL !== "." && this.props.extended === true) && (
						<StyledCardMeta>
							<Icon name="book" />Editorial: {this.props.hit.EDITORIAL}
						</StyledCardMeta>
					)}

					{this.props.hit.EXPOSITOR !== "." && (
						<StyledCardMeta>
							<Icon name="home" /> Expositor: {this.props.hit.EXPOSITOR}
						</StyledCardMeta>
					)}

					<StyledCardMeta>
						<Icon name="map outline" /> Stand(s):{" "}
						{this.filterStands(this.props.hit.STAND)}
					</StyledCardMeta>
				</Card.Content>

				<StyledExtra extra>
					{this.props.hit.MATERIA !== "." && (
						<Fragment>
							<Icon name="tag" />
							{this.props.hit.MATERIA}
						</Fragment>
					)}
					{this.props.hit.ISBN !== "." && (
						<ISBN>
							<Icon name="archive" /> ISBN: {this.props.hit.ISBN}
						</ISBN>
					)}
				</StyledExtra>
			</LibroCard>
		);
	}
}

export default Libro;
