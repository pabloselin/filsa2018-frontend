import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Header from "./components/Header";
import PreHeader from "./components/PreHeader";
import Home from "./components/Home";
import Default from "./components/Default";
import MenuTop from "./components/MenuTop";
import api from "./utils/api.js";
import config from "./config.json";

class Filsa2018 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerimg: null,
      menu_principal: null
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
  }

  refineURL(url) {
    return config["base_path." + process.env.NODE_ENV] + url.substring(config["base_url." + process.env.NODE_ENV].length);
  }

  menus() {
    let menuitems;
    if (this.state.menu_principal !== null) {
      menuitems = <MenuTop menuitems={this.state.menu_principal} />;
    }
    return menuitems;
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
      <div>
        <PreHeader />
        <Header headerimg={this.state.headerimg} />
        <Container>
          <Router>
            <div>
              {this.menus()}
              <Route exact path="/" component={Home} />
              {this.routes()}
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

export default Filsa2018;
