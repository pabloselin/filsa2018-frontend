import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Responsive } from "semantic-ui-react";
import Header from "./components/Header";
import PreHeader from "./components/PreHeader";
import Home from "./components/Home";
import Default from "./components/Default";
import MenuTop from "./components/MenuTop";
import MenuMobile from "./components/MenuMobile";
import api from "./utils/api.js";
import config from "./config.json";

class Filsa2018 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerimg: null,
      menu_principal: null,
      twitter: null,
      facebook: null,
      instagram: null,
      flickr: null
    };
  }

  componentDidMount() {
    //Header
    api.get("/filsa2018/v1/options/filsa2018_cabecera_escritorio").then(res => {
      this.setState({ headerimg: res.data });
    });
    //Menu
    api.get("/filsa2018/v1/options/filsa2018_menu").then(res => {
      api.get("/filsa2018/v1/menus/" + res.data).then(res => {
        this.setState({
          menu_principal: res.data
        });
      });
    });
    //Redes
    api.get("/filsa2018/v1/options/filsa2018_twitter").then(res => {
      this.setState({
        twitter: res.data
      });
    });
    api.get("/filsa2018/v1/options/filsa2018_facebook").then(res => {
      this.setState({
        facebook: res.data
      });
    });
    api.get("/filsa2018/v1/options/filsa2018_instagram").then(res => {
      this.setState({
        instagram: res.data
      });
    });
    api.get("/filsa2018/v1/options/filsa2018_flickr").then(res => {
      this.setState({
        flickr: res.data
      });
    });
  }

  refineURL(url) {
    return (
      config["base_path." + process.env.NODE_ENV] +
      url.substring(config["base_url." + process.env.NODE_ENV].length)
    );
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
    if(this.state.menu_principal !== null) {
      menumobileitems = <MenuMobile menuitems={this.state.menu_principal} />
    }
    return menumobileitems;
  }

  routes() {
    let routeitems;
    if (this.state.menu_principal !== null) {
      routeitems = this.state.menu_principal.map(item => (
        <Route
          key={item.object_id}
          path={this.refineURL(item.url)}
          component={render => <Default id={item.object_id} />}
        />
      ));
    }

    return routeitems;
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
              <Route
                exact
                path={config["base_path." + process.env.NODE_ENV]}
                component={Home}
              />
              {this.routes()}
            </div>
          </Container>
        </div>
      </Router>
    );
  }
}

export default Filsa2018;
