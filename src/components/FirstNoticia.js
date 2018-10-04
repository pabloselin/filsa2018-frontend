import React, { Component, Fragment } from "react";
import { Responsive, Grid, Button, Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NewsImage = styled.div`
	position: relative;
	max-width: 100%;
	background-size: cover;
	min-height: 300px;
	background-repeat: no-repeat;
	&:after {
		display:block;
		content: '';
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0.3) 43%, rgba(0,0,0,0.8) 100%);
		position: absolute;
		top:0;
		left:0;
		z-index: 2;
		transition: all linear 0.3s;
	}
	
	h1 {
		color: white;
		position: absolute;
		bottom: 12px;
		left: 12px;
		padding: 24px 24px 0 12px;
		font-size: 38px;
		z-index: 3;
		transition: all linear 0.3s;
		@media only screen and (max-width: 768px) {
			font-size: 24px;
			padding: 12px;
		}
	}

	&:hover {
		&:after {
			background-color: rgba(0, 0, 0, 0.1);
		}
		h1 {
			bottom: 22px;
		}
	}
`;


const NewsGrid = styled(Grid)`
	&&& {
		margin: 12px 0 24px 0;
		border: 1px solid #ccc;
		@media only screen and (min-width: 1200px) {
			margin: 24px auto 24px auto;
			max-width: 900px;
			img {
				width: 100%;
				height: auto;
			}
		}
	}
`;

const SimpleRow = styled(Grid.Row)`
	&&& {
		padding: 12px 0 12px 0;
		text-align: center;
	}
`;

const NewsRow = styled(Grid.Row)`
	&&& {
		padding: 0;
	}
`;

const ImageColumn = styled(Grid.Column)`
	&&&&& {
		padding: 0;
		line-height: 0;
	}
`;

class FirstNoticia extends Component {
	render() {
		return (
			<Fragment>
				<Responsive as={Divider} hidden {...Responsive.OnlyMobile} />
				<NewsGrid padded="vertically" columns={1}>
					<NewsRow
						as={Link}
						to={`/noticias/${
							this.props.noticia.content.slug
						}/`}
					>
						<ImageColumn>
							<NewsImage
								style={{
									backgroundImage: `url(${
										this.props.noticia.content.media
											.medium_large
									})`
								}}
								alt={this.props.noticia.title}
							>
								<h1>{this.props.noticia.title}</h1>
							</NewsImage>
						</ImageColumn>
					</NewsRow>
				</NewsGrid>
				<Grid padded="vertically">
					<SimpleRow>
						<Grid.Column>
							<Responsive
								as={Divider}
								hidden
								{...Responsive.OnlyComputer}
							/>
							<Button
								color="red"
								animated
								as={Link}
								to={`/noticias/`}
							>
								<Button.Content visible>
									<Icon name="plus" /> noticias
								</Button.Content>
								<Button.Content hidden>
									<Icon name="arrow right" />
								</Button.Content>
							</Button>
						</Grid.Column>
					</SimpleRow>
				</Grid>
			</Fragment>
		);
	}
}

export default FirstNoticia;
