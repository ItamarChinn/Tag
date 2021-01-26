import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import NavBar from "../modules/NavBar.js"
import JourneyFeed from "../modules/JourneyFeed.js";
import Confetti from 'react-confetti';


import "../../utilities.css";
import "./Dashboard.css";

const GOOGLE_CLIENT_ID = "431422395324-ngd8u3e3h6a1lfg6a1ljo3pukgpu0daj.apps.googleusercontent.com";

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
            togglePopup={this.togglePopup}
            partyMode={this.state.partyMode}
            toggleParty={this.toggleParty} />
           
        </div>
        <div className="Dashboard-container2">
          
          <JourneyFeed
            userId={this.state.userId}
            completed={true}
            togglePopup={this.togglePopup} />
        </div>


      </div>
    );
  }
};

export default Dashboard;
