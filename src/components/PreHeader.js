import React, { Component } from "react";
import { Icon, Grid } from "semantic-ui-react";
import styled from "styled-components";

const Brand = styled.a`
	text-transform: uppercase;
	vertical-align: middle;
	line-height: 24px;
`;

const BrandImg = styled.img`
	margin-top: 6px;
	margin-right: 6px;
	float: left;
`;

const BrandText = styled.span`
	margin-top: 6px;
	display: block;
`;

const StyledPreHeader = styled.div`
	background-color: #f8f8f8;
	border-bottom: 1px solid #ccc;
	padding: 3px;
`;

const Redes = styled(Grid.Column)`
	text-align: right;
`;

const SocialLink = styled.a`
	color: #6c6c6c;
	font-size: 18px;
	margin-top: 7px;
	display: inline-block;
`;

class PreHeader extends Component {
	render() {
		return (
			<StyledPreHeader>
				<Grid container columns={2}>
					<Grid.Column floated="left">
						<Brand href="https://camaradellibro.cl">
							<BrandImg
								src="https://camaradellibro.cl/wp-content/themes/cchl_wp/img/filsa2014/cchl_filsaheader.png"
								alt="Cámara Chilena del Libro"
							/>
							<BrandText>Cámara Chilena del Libro</BrandText>
						</Brand>
					</Grid.Column>
					<Redes floated="right">
						<SocialLink target="_blank" href={`https://facebook.com/${this.props.facebook}`}>
							<Icon name="facebook" />
						</SocialLink>
						<SocialLink target="_blank" href={`https://twitter.com/${this.props.twitter}`}>
							<Icon name="twitter" />
						</SocialLink>
						<SocialLink target="_blank" href={`https://instagram.com/${this.props.instagram}`}>
							<Icon name="instagram" />
						</SocialLink>
						<SocialLink target="_blank" href={this.props.flickr}>
							<Icon name="flickr" />
						</SocialLink>
					</Redes>
				</Grid>
			</StyledPreHeader>
		);
	}
}

export default PreHeader;
