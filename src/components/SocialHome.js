import React, { Component, Fragment } from "react";
import { Responsive, Grid, Button, Icon } from "semantic-ui-react";
import { FacebookProvider, Page } from "react-facebook";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import YouTube from "react-youtube";
import Helmet from "react-helmet";
import styled from "styled-components";

const SocialButton = styled(Button)`
	&&& {
		margin-bottom: 12px;
	}
`;

const StyledInstagram = styled.div`
	width: 100%;
	iframe {
		width: 100% !important;
	}
`;

class SocialHome extends Component {
	render() {
		const opts = {
			height: "360",
			width: "100%",
			playerVars: {
				// https://developers.google.com/youtube/player_parameters
				autoplay: 0,
				rel: 0,
				playlist: this.props.ytextra ? this.props.ytextra : null
			}
		};
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
							<Helmet>
								<script
									async
									src="https://www.instagram.com/embed.js"
								/>
							</Helmet>
							<StyledInstagram>
								<blockquote className="instagram-media">
									<a
										href={this.props.instagrampost}
										target="_blank"
									>
										Instagram
									</a>
								</blockquote>
							</StyledInstagram>
						</Grid.Column>
						{this.props.extra &&
							this.props.flickralbum && (
								<Fragment>
									<Grid.Column width={8}>
										<Helmet>
											<script
												async
												src="//embedr.flickr.com/assets/client-code.js"
												charset="utf-8"
											/>
										</Helmet>
										<a
											data-flickr-embed="true"
											href={this.props.flickralbum}
										>
											<img
												src="https://farm2.staticflickr.com/1906/44833839604_643c1d8e0c_z.jpg"
												width="100%"
												alt="Inauguración FILSA 2018"
											/>
										</a>
									</Grid.Column>
									<Grid.Column width={8}>
										<YouTube
											videoId={this.props.ytmain}
											opts={opts}
										/>
									</Grid.Column>
								</Fragment>
							)}
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
