import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Dashboard from "./pages/Dashboard.js";
import NavBar from "./modules/NavBar.js";
import SignUp from "./pages/SignUp.js";


import "./App.css";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <html>
        <div className="App-background">
          <Router>
            {(this.state.userId) ? (
              <Dashboard
                path="/"
                handleLogout={this.handleLogout}
                userId={this.state.userId}
              />) : (
                <SignUp
                  path="/"
                  handleLogin={this.handleLogin}
                  userId={this.state.userId} />
              )}
            <NotFound default />
          </Router>
        </div>
      </html>
    );
  }
}

export default App;
