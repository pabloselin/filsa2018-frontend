import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Responsive } from "semantic-ui-react";
import ReactGA from "react-ga";
import Header from "./components/Header";
import PreHeader from "./components/PreHeader";
import Home from "./components/Home";
import Default from "./components/Default";
import EventSingle from "./components/EventSingle";
import MenuTop from "./components/MenuTop";
import MenuMobile from "./components/MenuMobile";
import SingleNoticiaAlt from "./components/SingleNoticiaAlt";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import api from "./utils/api";
import config from "./config.json";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Maitree", "Maitree:n4,n7"]
  }
});

const node_env = process.env.NODE_ENV || "development";

if (node_env === "development") {
  ReactGA.initialize(config[node_env].google_analytics_ua, {
    testMode: true,
    debug: true
  });
} else {
  ReactGA.initialize(config[node_env].google_analytics_ua);
}

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
      eventos: null,
      ismobile: false,
      filsa2018_contents: null,
      filsa2018_noticias: null
    };
  }

  componentDidMount() {
    //General options
    if(window.params === undefined) {
      api.get("/filsa2018/v1/params/").then(res => {
      this.setState({
        params: res.data,
        facebook: res.data["filsa2018_facebook"],
        twitter: res.data["filsa2018_twitter"],
        instagram: res.data["filsa2018_instagram"],
        flickr: res.data["filsa2018_flickr"],
        headerimg: res.data["filsa2018_cabecera_escritorio"],
        mobileimg: res.data["filsa2018_cabecera_movil"],
        menu_principal: res.data["filsa2018_menu"],
        menu_noticias: res.data["filsa2018_menunoticias"],
        intro: res.data["filsa2018_intro"],
        title: res.data["filsa2018_title"],
        filsa2018_contents: res.data["filsa2018_contents"],
        filsa2018_noticias: res.data["filsa2018_noticias"],
        eventos: res.data["eventos"]
      });
    });
    } else {
      this.setState({
        params: window.params,
        facebook: window.params["filsa2018_facebook"],
        twitter: window.params["filsa2018_twitter"],
        instagram: window.params["filsa2018_instagram"],
        flickr: window.params["filsa2018_flickr"],
        headerimg: window.params["filsa2018_cabecera_escritorio"],
        mobileimg: window.params["filsa2018_cabecera_movil"],
        menu_principal: window.params["filsa2018_menu"],
        menu_noticias: window.params["filsa2018_menunoticias"],
        intro: window.params["filsa2018_intro"],
        title: window.params["filsa2018_title"],
        filsa2018_contents: window.params["filsa2018_contents"],
        filsa2018_noticias: window.params["filsa2018_noticias"],
        eventos: window.params["eventos"]
      })
    }
    
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
    let itemsfilsa = this.state.filsa2018_contents;
    itemsfilsa.map(item => {
      if (item.id === postID) {
        matched = item.slug;
      }
      return matched;
    });
    return matched;
  }

  routes() {
    let routeitems;
    if (this.state.filsa2018_contents !== null) {
      let itemsfilsa = this.state.filsa2018_contents;
      routeitems = itemsfilsa.map(item => {
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
                title={item.title}
                content={item.content}
                component={item.component}
                params={this.state.params}
                seotitle={item.seotitle}
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
    if (this.state.filsa2018_noticias !== null) {
      newsroutes = this.state.filsa2018_noticias.map(item => {
        let otrasnoticias = this.state.filsa2018_noticias.reduce((result,noticia) => {
          if (noticia.title !== item.title) {
            result.push(noticia);
          }
          return result;
        }, []);
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
                otras_noticias={otrasnoticias}
                seotitle={item.seotitle}
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
            <Fragment>
              <Responsive minWidth={769}>
                <PreHeader
                  twitter={this.state.twitter}
                  facebook={this.state.facebook}
                  instagram={this.state.instagram}
                  flickr={this.state.flickr}
                />
              </Responsive>
              <Header
                headerimg={this.state.headerimg}
                mobileheaderimg={this.state.mobileimg}
              />
              {this.mobilemenu()}
              <Fragment>
                {this.menus()}
                {loading ? (
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <Home
                        {...props}
                        noticias={this.state.menu_noticias}
                        noticias_content={this.state.filsa2018_noticias}
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
                <Route
                  key="eventos"
                  path="/eventos/:slug/"
                  component={EventSingle}
                />
              </Fragment>
              {this.state.params && <Footer />}
            </Fragment>
          </ScrollToTop>
        </Router>
      </Responsive>
    );
  }
}

export default Filsa2018;
