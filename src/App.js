import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Responsive } from "semantic-ui-react";
import ReactGA from "react-ga";
import styled from "styled-components";
import Header from "./components/Header";
import PreHeader from "./components/PreHeader";
import Home from "./components/Home";
import Default from "./components/Default";
import MenuTop from "./components/MenuTop";
import MenuMobile from "./components/MenuMobile";
import SingleNoticiaAlt from "./components/SingleNoticiaAlt";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
import api from "./utils/api";
import config from "./config.json";

const node_env = process.env.NODE_ENV || "development";

if (node_env === "development") {
  ReactGA.initialize(config[node_env].google_analytics_ua, {
    testMode: true,
    debug: true
  });
} else {
  ReactGA.initialize(config[node_env].google_analytics_ua);
}

const MainContainer = styled(Container)`
  && {
    @media only screen and (min-width: 1200px) {
      width: 1140px;
    }
  }
`;

class Filsa2018 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerimg: null,
      menu_principal: null,
      menu_noticias: null,
      intro: null,
      title: null,
      twitter: null,
      facebook: null,
      instagram: null,
      flickr: null,
      params: null,
      noticias: null,
      itemsfilsa: null,
      ismobile: false
    };
  }

  componentDidMount() {
    //General options
    api.get("/filsa2018/v1/params/").then(res => {
      this.setState({
        params: res.data,
        facebook: res.data["filsa2018_facebook"],
        twitter: res.data["filsa2018_twitter"],
        instagram: res.data["filsa2018_instagram"],
        flickr: res.data["filsa2018_flickr"],
        headerimg: res.data["filsa2018_cabecera_escritorio"],
        menu_principal: res.data["filsa2018_menu"],
        menu_noticias: res.data["filsa2018_menunoticias"],
        intro: res.data["filsa2018_intro"],
        title: res.data["filsa2018_title"]
      });
    });
    api.get("/better-rest-endpoints/v1/ferias/filsa-2018").then(res => {
      this.setState({
        noticias: res.data
      });
    });
    api.get("/wp/v2/filsa-2018").then(res => {
      this.setState({
        itemsfilsa: res.data
      });
    });
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

  matchParent(postID) {
    let matched;
    this.state.itemsfilsa.map(item => {
      if (item.id === postID) {
        matched = item.slug;
      }
      return matched;
    });
    return matched;
  }

  routes() {
    let routeitems;
    if (this.state.itemsfilsa !== null) {
      routeitems = this.state.itemsfilsa.map(item => {
        let path =
          this.matchParent(item.parent) !== undefined
            ? `/${this.matchParent(item.parent)}/${item.slug}/`
            : `/${item.slug}/`;
        return (
          <Route
            key={item.id}
            path={path}
            exact
            render={props => (
              <Default
                {...props}
                type={item.object}
                id={item.id}
                title={item.title.rendered}
                content={item.content.rendered}
              />
            )}
          />
        );
      });
    }
    return routeitems;
  }

  newsroutes() {
    let newsroutes;
    if (this.state.noticias !== null) {
      newsroutes = this.state.noticias.map(item => {
        return (
          <Route
            key={item.id}
            path={"/noticias/" + item.slug + "/"}
            render={props => (
              <SingleNoticiaAlt
                {...props}
                type={item.object}
                id={item.id}
                content={item.content}
                title={item.title}
                media={item.media}
              />
            )}
          />
        );
      });
    }
    return newsroutes;
  }

  handleOnUpdate = (e, { width }) => this.setState({ width });

  render() {
    const loading = this.state.menu_noticias !== null;
    const { width } = this.state;
    const top = width >= Responsive.onlyComputer.minWidth ? 360 : 0;
    return (
      <Responsive fireOnMount onUpdate={this.handleOnUpdate}>
      <Router basename={config[node_env].basename}>      
        <ScrollToTop top={top}>
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
            <MainContainer>
              <div>
                {this.menus()}
                {loading ? (
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <Home
                        {...props}
                        noticias={this.state.menu_noticias}
                        noticias_content={this.state.noticias}
                        content={this.state.intro}
                        title={this.state.title}
                      />
                    )}
                  />
                ) : (
                  <Loading />
                )}

                {this.routes()}
                {this.newsroutes()}
              </div>
            </MainContainer>
          </div>
        </ScrollToTop>
      </Router>
      </Responsive>
    );
  }
}

export default Filsa2018;
