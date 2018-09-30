import React, { Component, Fragment } from "react";
import { Responsive, Grid, Button, Icon } from "semantic-ui-react";
import { FacebookProvider, Page } from "react-facebook";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";
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
					<Grid columns={3} padded="vertically">
						<Grid.Column>
							<FacebookProvider appId={this.props.facebookid}>
								<Page
									href={this.props.facebook}
									tabs="timeline"
									height={563}
								/>
							</FacebookProvider>
						</Grid.Column>
						<Grid.Column>
							<TwitterTimelineEmbed
								sourceType="profile"
								screenName={this.props.twitter}
								options={{ height: 563 }}
							/>
						</Grid.Column>
						<Grid.Column>
							<InstagramEmbed
								url={this.props.instagrampost}
								hideCaption={true}
							/>
						</Grid.Column>
					</Grid>
				</Responsive>
				<Responsive {...Responsive.onlyMobile}>
					<SocialButton
						target="_blank"
						fluid
						color="facebook"
						as="a"
						href={`https://facebook.com/${this.props.facebook}`}
					>
						<Icon name="facebook" /> Facebook
					</SocialButton>
					<SocialButton
						target="_blank"
						fluid
						color="twitter"
						as="a"
						href={`https://twitter.com/${this.props.twitter}`}
					>
						<Icon name="twitter" /> Twitter
					</SocialButton>
					<SocialButton
						target="_blank"
						fluid
						color="purple"
						as="a"
						href={`https://instagram.com/${this.props.instagram}`}
					>
						<Icon name="instagram" /> Instagram
					</SocialButton>
				</Responsive>
			</Fragment>
		);
	}
}

export default SocialHome;
