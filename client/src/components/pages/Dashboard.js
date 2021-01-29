import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import NavBar from "../modules/NavBar.js"
import JourneyFeed from "../modules/JourneyFeed.js";
import Confetti from 'react-confetti';


import "../../utilities.css";
import "./Dashboard.css";

const GOOGLE_CLIENT_ID = "431422395324-ngd8u3e3h6a1lfg6a1ljo3pukgpu0daj.apps.googleusercontent.com";


/**
 * This is the Dashboard page, it is the main page of the website
 * Takes as props from App.js:
 * @handleLogout : function
 * @userId : String
 */


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      partyMode: false,
    };
  }


  componentDidMount() {
    document.title = "Dashboard";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ userId: user }));
  }

  // Function that sets of confetti by making partyMode: true, and then the Confetti component turns it off again
  toggleParty = () => {
    this.setState({ partyMode: !this.state.partyMode })
  }


  render() {
    return (
      <div className="Dashboard-background">
        {this.state.partyMode && 
        <Confetti
        recycle={false}
        numberOfPieces={500}
        onConfettiComplete={this.toggleParty}
        />}
        <NavBar
          handleLogout={this.props.handleLogout}
          userId={this.state.userId} />
          
        <div className="Dashboard-container">
          <JourneyFeed
            userId={this.state.userId}
            completed={false}
            partyMode={this.state.partyMode}
            toggleParty={this.toggleParty} />
           
        </div>
        <div className="Dashboard-container2">
          
          <JourneyFeed
            userId={this.state.userId}
            completed={true}
            partyMode={this.state.partyMode}
            toggleParty={this.toggleParty} 
            />
        </div>


      </div>
    );
  }
};

export default Dashboard;
