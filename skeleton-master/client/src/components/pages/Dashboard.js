import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import NavBar from "../modules/NavBar.js"
import JourneyFeed from "../modules/JourneyFeed.js";

import "../../utilities.css";
import "./Dashboard.css";

const GOOGLE_CLIENT_ID = "431422395324-ngd8u3e3h6a1lfg6a1ljo3pukgpu0daj.apps.googleusercontent.com";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    document.title = "Dashboard";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  render() {
    return (
        <>
        <NavBar
          handleLogout={this.props.handleLogout}
          userId={this.state.userId}/>
        <div className="Dashboard-title">Your Journeys</div>
        <JourneyFeed 
        userId={this.state.userId}
        completed={false}/>
        <div className="Dashboard-title">Your Completed Journeys</div>
        <JourneyFeed 
        userId={this.state.userId}
        completed={true}
        />
        </>
    );
  }
};

export default Dashboard;
