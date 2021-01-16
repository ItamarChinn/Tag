import React, { Component } from "react";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title">Profile</div>
      </nav>
    );
  }
}

export default NavBar;