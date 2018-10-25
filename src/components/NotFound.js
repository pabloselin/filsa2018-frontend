import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import Helmet from "react-helmet";
import trackPage from "../utils/trackPage";
import styled from "styled-components";

const Title = styled.h1`
	margin-top: 24px !important;
	color: #cc1011;
	@media screen and (max-width: 768px) {
		font-size: 24px;
	}
`;

const StyledContainer = styled(Container)`
	@media only screen and (min-width: 1213px) {
		&&&.visitas-guiadas {
			width: 950px;
		}
	}
`;

const MainContentText = styled.div`
	margin-bottom: 36px;
	font-size: 18px;
	img {
		max-width: 100%;
		height: auto;
	}

	@media screen and (max-width: 768px) {
		h2 {
			font-size: 1.3rem;
		}
		h3 {
			font-size: 1.25rem;
		}
		font-size: 16px;
	}
`;

class Default extends Component {
	constructor(props) {
		super(props);

		this.state = {
			params: this.props.params
		};
	}

	componentDidMount() {
		trackPage(this.props.location.pathname, this.props.seotitle);
	}
	
	render() {
		const text = this.props.component !== 'normal' ? false : true;
		return (
			<Fragment>
				<Helmet>
					<title>{this.props.seotitle}</title>
				</Helmet>
				<StyledContainer text={text} className="maincontent">
					<Title>
						404: No encontrado
					</Title>
					<MainContentText className="maincontent-text">
						<p>Contenido no encontrado</p>
					</MainContentText>
				</StyledContainer>
			</Fragment>
		);
	}
}

export default Default;
