import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./NavBar.css";


const GOOGLE_CLIENT_ID = "431422395324-ngd8u3e3h6a1lfg6a1ljo3pukgpu0daj.apps.googleusercontent.com";
/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-box">
          <div className="NavBar-title u-inlineBlock">
            &nbsp; Tag
            <div className="NavBar-subtitle u-inlineBlock"> chase your dreams &nbsp;</div>
            &nbsp;
          </div>
        </div>
        <div className="NavBar-linkContainer u-inlineBlock">
        <div className="NavBar-box2 u-inlineBlock">
          <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              render={renderProps => (
                <button className = ".NavBar-logout" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
              )}
            />
        </div>
        </div>
        
      </nav>
    );
  }
};

export default NavBar;