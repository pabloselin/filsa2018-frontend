import React, { Component, Fragment } from "react";
import { Popup } from "semantic-ui-react";
import shareios from "../assets/img/share_ios.png";
import styled from "styled-components";

const PopupContext = styled.span`
	position: fixed;
	bottom: 0;
	height: 0;
	width: 100%;
	display: block;
`;

const StyledPopupContent = styled(Popup.Content)`
	text-align: center;
`;

const ShareImg = styled.img`
	margin-left: 12px;
	margin-right: 12px;
	vertical-align: -8px;
`

class IosPwa extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showInstallMessage: false,
			node: null
		};
		this.handleRef = React.createRef();
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		this.setState({
			node: this.handleRef
		});
		this.detectIos();
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll(event) {
		this.setState({
			showInstallMessage: false
		});
	}

	// Detects if device is on iOS
	detectIos() {
		const isIos = () => {
			const userAgent = window.navigator.userAgent.toLowerCase();
			return /iphone|ipad|ipod/.test(userAgent);
		};
		// Detects if device is in standalone mode
		const isInStandaloneMode = () =>
			"standalone" in window.navigator && window.navigator.standalone;

		// Checks if should display install popup notification:
		if (isIos() && !isInStandaloneMode()) {
			this.setState({ showInstallMessage: true });
		}
	}

	render() {
		return (
			<Fragment>
				<Popup
					flowing
					position="top center"
					open={this.state.showInstallMessage}
					trigger={<PopupContext />}
					hideOnScroll
				>
					<StyledPopupContent>
						<p>Instala esta aplicación web en tu teléfono.</p>
						<p>
							Pulsa 
							<ShareImg
								width={20}
								src={shareios}
								alt="Compartir iOS"
							/>{" "}
							y luego "Añadir a pantalla de inicio"
						</p>
					</StyledPopupContent>
				</Popup>
			</Fragment>
		);
	}
}

export default IosPwa;
