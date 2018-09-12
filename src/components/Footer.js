import React, { Component } from "react";
import { Container, Grid, Icon, Responsive, List } from "semantic-ui-react";
import logocchl from "../assets/img/cchl_logo_blanco.svg";
import styled from "styled-components";

const StyledFooter = styled.div`
	background-color: #555555;
	color: white;
	padding: 32px 0;
	margin-top: 36px;
`;

const StyledItem = styled(List.Item)`
	margin-bottom: 12px;
`

class Footer extends Component {
	render() {
		return (
			<Responsive {...Responsive.onlyComputer}>
				<StyledFooter>
					<Container>
						<Grid columns={2}>
							<Grid.Column>
								<img
									width="238"
									height="80"
									src={logocchl}
									alt="Cámara del Libro"
								/>
								<br />
								<p><em>67 años trabajando por el libro y la lectura</em></p>
							</Grid.Column>
							<Grid.Column>
								<List inverted>
									<StyledItem>
										<Icon name="map marker" />
										<List.Content>
											<List.Description>
												Av. Libertador Bernardo
												O´Higgins 1370<br />
												Oficina 502<br />
												Santiago de Chile.
											</List.Description>
										</List.Content>
									</StyledItem>
									<StyledItem>
										<Icon name="phone" />
										<List.Content>
											<List.Description>
												+562 267203 48
											</List.Description>
										</List.Content>
									</StyledItem>
									<StyledItem>
										<Icon name="mail" />
										<List.Content>
											<List.Description>
												camaralibrochile@camaradellibro.cl
											</List.Description>
										</List.Content>
									</StyledItem>
								</List>
							</Grid.Column>
						</Grid>
					</Container>
				</StyledFooter>
			</Responsive>
		);
	}	
}

export default Footer;
