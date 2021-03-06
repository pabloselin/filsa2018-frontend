import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { Responsive } from "semantic-ui-react";
import ReactGA from "react-ga";
import IosPwa from "./components/IosPwa";
import Header from "./components/Header";
//import Home from "./components/Home";
//import Default from "./components/Default";
import NotFound from "./components/NotFound";
//import EventSingle from "./components/EventSingle";
//import SingleNoticiaAlt from "./components/SingleNoticiaAlt";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import api from "./utils/api";
import config from "./config.json";
import WebFont from "webfontloader";
import Loadable from "react-loadable";
import env from "./utils/env";

WebFont.load({
  google: {
    families: ["Maitree", "Maitree:n4,n7"]
  }
});
//Global env thing
const node_env = env();

if (node_env === "development") {
  ReactGA.initialize(config[node_env].google_analytics_ua, {
    testMode: true,
    debug: true
  });
} else {
  ReactGA.initialize(config[node_env].google_analytics_ua);
}

const Home = Loadable({
  loader: () => import("./components/Home"),
  loading: Loading
});

const Default = Loadable({
  loader: () => import("./components/Default"),
  loading: Loading
});

const EventSingle = Loadable({
  loader: () => import("./components/EventSingle"),
  loading: Loading
});

const SingleNoticiaAlt = Loadable({
  loader: () => import("./components/SingleNoticiaAlt"),
  loading: Loading
});

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
    if (window.params === undefined) {
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
          fastlinks: res.data["filsa2018_fastlinks"],
          menu_dos: res.data["filsa2018_menu_dos"],
          intro: res.data["filsa2018_intro"],
          title: res.data["filsa2018_title"],
          filsa2018_contents: res.data["filsa2018_contents"],
          filsa2018_noticias: res.data["filsa2018_noticias"],
          eventos: res.data["eventos"],
          youtube: res.data["filsa2018_youtube"],
          isContentLoaded: true
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
        menu_dos: window.params["filsa2018_menu_dos"],
        menu_noticias: window.params["filsa2018_menunoticias"],
        fastlinks: window.params["filsa2018_fastlinks"],
        intro: window.params["filsa2018_intro"],
        title: window.params["filsa2018_title"],
        filsa2018_contents: window.params["filsa2018_contents"],
        filsa2018_noticias: window.params["filsa2018_noticias"],
        eventos: window.params["eventos"],
        youtube: window.params["filsa2018_youtube"],
        isContentLoaded: true
      });
    }
  }

  matchColab(postID) {
    let colab;
    let itemsfilsa = this.state.filsa2018_contents;
    colab = itemsfilsa.filter(item => item.id === postID);
    if (colab.length >= 1) {
      return colab[0].extrafields;
    }
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
              extrafields={item.extrafields ? item.extrafields : null}
            />
          )}
        />
      );
    });
    return routeitems;
  }

  newsroutes() {
    let newsroutes;
    newsroutes = this.state.filsa2018_noticias.map(item => {
      let otrasnoticias = this.state.filsa2018_noticias.reduce(
        (result, noticia) => {
          if (noticia.title !== item.title) {
            result.push(noticia);
          }
          return result;
        },
        []
      );
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
              otras_noticias={otrasnoticias.slice(0, 5)}
              seotitle={item.seotitle}
            />
          )}
        />
      );
    });
    return newsroutes;
  }

  handleOnUpdate = (e, { width }) => this.setState({ width });

  render() {
    const { width } = this.state;
    const top = width >= Responsive.onlyComputer.minWidth ? 360 : 0;
    const loaded = this.state.isContentLoaded;
    return (
      <Responsive fireOnMount onUpdate={this.handleOnUpdate}>
        <IosPwa />
        <Router basename={config[node_env].basename}>
          <ScrollToTop top={top}>
            {loaded ? (
              <Fragment>
                <Header
                  headerimg={this.state.headerimg}
                  mobileheaderimg={this.state.mobileimg}
                  twitter={this.state.twitter}
                  facebook={this.state.facebook}
                  instagram={this.state.instagram}
                  flickr={this.state.flickr}
                  youtube={this.state.youtube}
                  fastlinks={this.state.fastlinks}
                  menu={this.state.menu_principal}
                  menu_dos={this.state.menu_dos}
                  mp4={this.state.params.filsa2018_cabecera_mp4}
                  webm={this.state.params.filsa2018_cabecera_webm}
                />
                <Switch>
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
                        facebook={this.state.facebook}
                        twitter={this.state.twitter}
                        flickr={this.state.flickr}
                        youtube={this.state.params.filsa2018_youtube}
                        instagram={this.state.instagram}
                        instagrampost={
                          this.state.params.filsa2018_instagrampost
                        }
                        facebookid={this.state.params.filsa2018_facebookid}
                        colaboradores={this.matchColab(
                          parseInt(this.state.params.filsa2018_colabpage, 0)
                        )}
                        eventos={this.state.params.filsa2018_eventosrapidos}
                      />
                    )}
                  />
                  {this.routes()}
                  {this.newsroutes()}
                  <Route
                    key="eventos"
                    path="/eventos/:slug/"
                    component={EventSingle}
                  />
                  <Route
                    key="visitas-old"
                    path="/visitas-guiadas-colegios/"
                    render={props => (
                      <Redirect to="/visitas-de-colegios-a-filsa/" />
                    )}
                  />
                  <Route key="notfound" component={NotFound} />
                </Switch>
                <Footer />
              </Fragment>
            ) : (
              <Loading />
            )}
          </ScrollToTop>
        </Router>
      </Responsive>
    );
  }
}

export default Filsa2018;
