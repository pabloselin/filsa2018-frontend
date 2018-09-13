import React, { Component, Fragment } from "react";
import { Container, Grid } from "semantic-ui-react";
import Helmet from "react-helmet";
import ReactGA from "react-ga";
import Noticia from "./Noticia";

class ArchiveNoticias extends Component {
	constructor(props) {
		super(props);
		this.state = {
			noticias: this.props.noticias
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.noticias !== prevProps.noticias) {
			this.setState({
				noticias: this.props.noticias
			});
		}
	}

	trackPage(page) {
		ReactGA.set({
			page
		});
		ReactGA.pageview(page);
	}

	componentDidMount() {
		//this.trackPage(this.props.location.pathname);
	}

	render() {
		return (
			<Fragment>
				<Helmet>
					<title>Noticias FILSA 2018</title>
				</Helmet>
				<Container>
					<Grid columns={3} divided stackable>
						{this.state.noticias !== null ? (
							this.props.noticias.map((noticia, key) => (
								<Noticia
									key={key}
									id={noticia.object_id}
									title={noticia.title}
									link={"/noticias/" + noticia.slug + "/"}
									slug={noticia.slug}
									media={noticia.media}
									content={noticia.content}
									date={noticia.date}
								/>
							))
						) : (
							<div />
						)}
					</Grid>
				</Container>
			</Fragment>
		);
	}
}

export default ArchiveNoticias;
