import React, { Component } from "react";
import "../styles/App.css";
import Dashboard from "../components/Dashboard";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";

import WithAuth from "../components/withAuth";
import { BackgroundRemove } from "../components/Background";
import { VideoCallProvider } from "../context/Context";
import IncomingCall from "../components/IncomingCall/IncomingCall";
import FormCard from "../components/FormCard/FormCard";




class App extends Component {
  componentDidMount() {
    BackgroundRemove();
  }
  render() {
    return (
        <div className="App">

          <Dashboard />
        </div>


    );
  }
}

export default WithAuth(App);
