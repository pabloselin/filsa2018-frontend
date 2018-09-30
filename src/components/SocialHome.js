import React, { Component, Fragment } from "react";
import { Responsive, Grid, Button, Icon } from "semantic-ui-react";
import { FacebookProvider, Page } from "react-facebook";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SocialButton = styled(Button)`
	&&& {
		margin-bottom: 12px;
	}
`;

class SocialHome extends Component {
	render() {
		return (
			<Fragment>
				<Responsive minWidth={769}>
					<Grid columns={3} padded="vertical">
						<Grid.Column>
							<FacebookProvider appId="1048728495191929">
								<Page
									href="https://www.facebook.com/filsachile"
									tabs="timeline"
									height={563}
								/>
							</FacebookProvider>
						</Grid.Column>
						<Grid.Column>
							<TwitterTimelineEmbed
								sourceType="profile"
								screenName="camaradellibro"
								options={{ height: 563 }}
							/>
						</Grid.Column>
						<Grid.Column>
							<InstagramEmbed
								url="https://www.instagram.com/p/BnmOGArl7_t/"
								hideCaption={true}
							/>
						</Grid.Column>
					</Grid>
				</Responsive>
				<Responsive {...Responsive.onlyMobile}>
					<SocialButton
						target="_blank"
						fluid
						color="purple"
						as={Link}
						to="https://www.instagram.com"
					>
						<Icon name="instagram" /> Instagram
					</SocialButton>
					<SocialButton
						target="_blank"
						fluid
						color="facebook"
						as={Link}
						to="https://www.instagram.com"
					>
						<Icon name="facebook" /> Facebook
					</SocialButton>
					<SocialButton
						target="_blank"
						fluid
						color="twitter"
						as={Link}
						to="https://www.instagram.com"
					>
						<Icon name="twitter" /> Twitter
					</SocialButton>
				</Responsive>
			</Fragment>
		);
	}
}

export default SocialHome;
