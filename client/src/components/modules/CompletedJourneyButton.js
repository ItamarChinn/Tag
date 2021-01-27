import React, { Component } from "react";
import "./CompletedJourneyButton.css";

/**
 * Button that marks a journey complete and updates database
 */

class CompletedJourneyButton extends Component {
  constructor(props) {
    super(props);
  }

  clicked = () => {
    //updates the journey so it's completed
    this.props.completeJourney(this.props.journeyId);
  }

  render() {
    let textComplete = null;
    this.props.complete ? textComplete = <>Mark as incomplete</> : textComplete = <>Complete journey</>;
    return (
      
      <div className="CompletedJourneyButton-button" onClick={this.clicked}>
          {textComplete}
      </div>
    );
  }
};

export default CompletedJourneyButton;