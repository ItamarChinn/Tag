import React, { Component } from "react";
import "./CompletedJourneyButton.css";

/**
 * CompletedJourneyButton is a button component that triggers the ComfirmCompletePopup 
 * which in turn marks a journey's status as completed
 * It inherits its props from JourneyDiagram.js (since that's where it is rendered):
 * @togglePopup : function (in JourneyCard.js)
 * @completed : Boolean,
 */

class CompletedJourneyButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let textComplete = null;
    this.props.completed ? textComplete = <>Mark as incomplete</> : textComplete = <>Complete journey</>;
    return (
      <div className="CompletedJourneyButton-button" onClick={this.props.togglePopup}>
        {textComplete}
      </div>
    );
  }
};

export default CompletedJourneyButton;