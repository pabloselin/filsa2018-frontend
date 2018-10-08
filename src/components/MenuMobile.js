import React, { Component } from "react";
import { Button, Menu, Transition, Responsive, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import MobileMenuItems from "./MobileMenuItems";

const Toggler = styled(Button)`
	&& {
		position: absolute;
		top: 32px;
		left: 0;
		color: white;
		border-radius: 0 5px 5px 0;
		font-size: 24px;
		padding: 12px;
		i {
			margin: 0 !important;
		}
	}
`;

const StyledMenu = styled(Menu)`
	&& {
		border-radius: 0;
		position: absolute;
		z-index: 10;
		top: 110px;
	}
`;

const StyledButtonGroup = styled(Button.Group)`
	&&&& {
		border-radius: 0;
		border-top: 1px solid #555;
		.button {
			border-radius: 0;
		}
	}
`;

class MenuMobile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
		this.handleVisibility = this.handleVisibility.bind(this);
	}

	handleVisibility() {
		this.setState({ visible: !this.state.visible });
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.setState({ visible: false });
		}
	}

	render() {
		const visible = this.state.visible;

		return (
			<Responsive {...Responsive.onlyMobile}>
				<Toggler color="black" onClick={this.handleVisibility}>
					<Icon name="bars" />
				</Toggler>
				<Transition.Group animation="slide down" duration={500}>
					{visible && (
						<StyledMenu inverted vertical fluid animation="overlay">
							<MobileMenuItems menuitems={this.props.menuitems} />
							<MobileMenuItems
								menuitems={this.props.secondmenuitems}
								nohome
							/>
							<StyledButtonGroup icon fluid widths={5} size="big" color="black">
								<Button
									name="facebook"
									as="a"
									href={`https://facebook.com/${
										this.props.facebook
									}`}
									title="Facebook"
									target="_blank"
								>
									<Icon name="facebook" />
								</Button>
								<Button
									name="twitter"
									as="a"
									href={`https://twitter.com/${
										this.props.twitter
									}`}
									title="Twitter"
									target="_blank"
								>
									<Icon name="twitter" />
								</Button>
								<Button
									name="instagram"
									as="a"
									href={`https://instagram.com/${
										this.props.instagram
									}`}
									title="Instagram"
									target="_blank"
								>
									<Icon name="instagram" />
								</Button>
								<Button
									name="youtube"
									as="a"
									href={this.props.youtube}
									title="Canal de Youtube"
									target="_blank"
								>
									<Icon name="youtube" />
								</Button>
								<Button
									name="flickr"
									as="a"
									href={this.props.flickr}
									title="Flickr"
									target="_blank"
								>
									<Icon name="flickr" />
								</Button>
							</StyledButtonGroup>
						</StyledMenu>
					)}
				</Transition.Group>
			</Responsive>
		);
	}
}

export default withRouter(MenuMobile);
