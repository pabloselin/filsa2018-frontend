import React, { Component, Fragment } from "react";
import { Button, Label, Icon, Responsive, Divider } from "semantic-ui-react";
import axios from "axios";
import config from "../config.json";

class SocialButtons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: null,
			fbcount: null
		};
	}

	getShares() {
		axios
			.get("https://graph.facebook.com/?id=" + this.state.url)
			.then(res => {
				this.setState({
					fbcount: res.data.share.share_count
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.url !== prevState.url) {
			this.getShares();
		}
	}

	componentDidMount() {
		let node_env = window.env || "development";
		let url = config[node_env].base_url_noslash + this.props.url;
		this.setState({
			url: url,
			fburl: `https://facebook.com/sharer/sharer.php?u=${url}&t=${this.props.title}&display=popup`
		});
	}

	render() {
		return (
			<Fragment>
				{this.state.fbcount > 0 ? (
					<Button
						as="a"
						target="_blank"
						href={this.state.fburl}
						labelPosition="right"
						size="mini"
					>
						<Button size="mini" color="facebook" icon>
							<Icon name="facebook f" />
						</Button>
						<Label basic pointing="left">
							{this.state.fbcount}
						</Label>
					</Button>
				) : (
					<Button
						icon
						color="facebook"
						as="a"
						target="_blank"
						href={this.state.fburl}
						size="mini"
					>
						<Icon name="facebook f" />
					</Button>
				)}
				<Button
					icon
					as="a"
					target="_blank"
					href={`https://twitter.com/home?status=${encodeURIComponent(
						this.props.title
					)}+${encodeURIComponent(this.state.url)}`}
					size="mini"
					color="twitter"
				>
					<Icon name="twitter" />
				</Button>
				<Responsive as="span" {...Responsive.onlyMobile}>
					<Button
						icon
						as="a"
						target="_blank"
						href={`whatsapp://send?text=${encodeURIComponent(
							this.props.title
						)}+${encodeURIComponent(this.state.url)}`}
						size="mini"
						color="green"
					>
						<Icon name="whatsapp" />
					</Button>
				</Responsive>
				<Divider hidden />
			</Fragment>
		);
	}
}

export default SocialButtons;
