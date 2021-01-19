import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Signup.css";

const GOOGLE_CLIENT_ID = "431422395324-ngd8u3e3h6a1lfg6a1ljo3pukgpu0daj.apps.googleusercontent.com";

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="Signup-background">
          <div className="Signup-holdall">
          <div className="Signup-centering">
            <div className="Signup-title2 u-inlineBlock"> 
              Welcome to &nbsp; 
              <div className="Signup-container">
                <div className="Signup-title1">
                &nbsp; Tag <div className="Signup-chase u-inlineBlock"> chase your dreams &nbsp;</div>
                </div>
              </div>
              </div> 
            </div>
            <div className="Signup-title3"> 
              <div>Please login to make your dreams come true</div>
              <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.props.handleLogin}
                  onFailure={(err) => console.log(err)}
                  />
            </div>
            </div>
            </div>
                      
      );
  }
};

export default SignUp;
