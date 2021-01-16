import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Dashboard.css";

const GOOGLE_CLIENT_ID = "431422395324-ngd8u3e3h6a1lfg6a1ljo3pukgpu0daj.apps.googleusercontent.com";

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
            <> 
            <h1>Welcome to Tag - chase your dreams</h1>
            <h2>Please login to make your dreams come true</h2>
            <div>This is the signup page</div>
            <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.props.handleLogin}
                  onFailure={(err) => console.log(err)}
                />
            </>);
  }
};

export default Signup;
