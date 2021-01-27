import React, { Component } from "react";
import "./NewJourneyButton.css";

/**
 * What is this>
 */
class CompletedJourneyButton extends Component {
  constructor(props) {
    super(props);
  }

  clicked = () => {
    //updates the journey so it's completed
  }

  render() {

    return (
      <div className="NewJourneyButton-button" onClick={this.clicked}>
          Complete this journey
      </div>
    );
  }
};

export default CompletedJourneyButton;