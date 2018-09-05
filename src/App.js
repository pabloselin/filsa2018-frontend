import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Responsive } from "semantic-ui-react";
import ReactGA from "react-ga";
import Header from "./components/Header";
import PreHeader from "./components/PreHeader";
import Home from "./components/Home";
import Default from "./components/Default";
import MenuTop from "./components/MenuTop";
import MenuMobile from "./components/MenuMobile";
import SingleNoticia from "./components/SingleNoticia";
import api from "./utils/api";
import config from "./config.json";

if (process.env.NODE_ENV === "development") {
  ReactGA.initialize(config["google_analytics_ua"], {
    testMode: true,
    debug: true
  });
} else {
  ReactGA.initialize(config["google_analytics_ua"]);
}

class Filsa2018 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerimg: null,
      menu_principal: null,
      menu_noticias: null,
      twitter: null,
      facebook: null,
      instagram: null,
      flickr: null,
      params: null
    };
  }

  componentDidMount() {
    //General options
    api.get("/filsa2018/v1/params/").then(res => {
      this.setState({ params: res.data });
      this.setState({ facebook: this.state.params["filsa2018_facebook"] });
      this.setState({ twitter: this.state.params["filsa2018_twitter"] });
      this.setState({ instagram: this.state.params["filsa2018_instagram"] });
      this.setState({ flickr: this.state.params["filsa2018_flickr"] });
      this.setState({
        headerimg: this.state.params["filsa2018_cabecera_escritorio"]
      });
      this.setState({ menu_principal: this.state.params["filsa2018_menu"] });
      this.setState({
        menu_noticias: this.state.params["filsa2018_menunoticias"]
      });
    });
  }

  refineURL(url) {
    return (
      config["base_path." + process.env.NODE_ENV] +
      url.substring(config["base_url." + process.env.NODE_ENV].length)
    );
  }

  refineNewsURL(url) {
    let slugsegment = url.split('/');
    slugsegment = slugsegment[slugsegment.length -2];
    return '/noticias/' + slugsegment;
  }

  menus() {
    let menuitems;
    if (this.state.menu_principal !== null) {
      menuitems = <MenuTop menuitems={this.state.menu_principal} />;
    }
    return menuitems;
  }

  mobilemenu() {
    let menumobileitems;
    if (this.state.menu_principal !== null) {
      menumobileitems = <MenuMobile menuitems={this.state.menu_principal} />;
    }
    return menumobileitems;
  }

  routes() {
    let routeitems;
    if (this.state.menu_principal !== null) {
      routeitems = this.state.menu_principal.map(item => {
        if (item.object === "filsa-2018") {
          return (
            <Route
              key={item.object_id}
              path={this.refineURL(item.url)}
              render={props => (
                <Default {...props} type={item.object} id={item.object_id} />
              )}
            />
          );
        } else {
          return null;
        }
      });
    }

    return routeitems;
  }

  newsRoutes() {
    let newsRoutes;
    if (this.state.menu_noticias !== null) {
      newsRoutes = this.state.menu_noticias.map(noticia => (
        <Route
          key={noticia.object_id}
          path={this.refineNewsURL(noticia.url)}
          render={props => (
            <SingleNoticia {...props} type={noticia.object} id={noticia.object_id} title={noticia.title} />
          )}
        />
      ));
    }
    return newsRoutes;
  }

  render() {
    return (
      <Router>
        <div>
          <Responsive {...Responsive.onlyComputer}>
            <PreHeader
              twitter={this.state.twitter}
              facebook={this.state.facebook}
              instagram={this.state.instagram}
              flickr={this.state.flickr}
            />
          </Responsive>
          <Header headerimg={this.state.headerimg} />
          {this.mobilemenu()}
          <Container>
            <div>
              {this.menus()}
              <Switch>
                <Route
                  exact
                  path={config["base_path." + process.env.NODE_ENV]}
                  render={props => (
                    <Home {...props} noticias={this.state.menu_noticias} />
                  )}
                />
                {this.routes()}
                {this.newsRoutes()}
              </Switch>
            </div>
          </Container>
        </div>
      </Router>
    );
  }
}

export default Filsa2018;
