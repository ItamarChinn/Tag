import React, { Component } from "react";
import "./NewProgressButton.css";

/**
 * This is the button that will record new progress in a specific journey
 */
class NewProgressButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NewProgressButton-button" onClick={this.props.addNewProgress}> 
          &nbsp; &nbsp; + New Progress &nbsp; &nbsp; &nbsp; 
        </div>
    );
  }
};

export default NewProgressButton;