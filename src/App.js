import React, { Component } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import api from "./utils/api.js";

import "./App.css";

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
    api.get("/filsa2018/v1/menus/308").then(res => {
      this.setState({ menu_principal: res.data })
    });
  }

  render() {
    const menu = () => {if(this.state.menu_principal !== null) {
      return (<Menu menuitems={this.state.menu_principal} />)
    }}
    return (
      <div className="Filsa2018">
        <Header headerimg={this.state.headerimg} />
        {menu()}
        <div className="Filsa2018-intro">
         
        </div>
      </div>
    );
  }
}

export default Filsa2018;
