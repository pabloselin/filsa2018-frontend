import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
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
				</Grid>
			</StyledPreHeader>
		);
	}
}

export default PreHeader;
