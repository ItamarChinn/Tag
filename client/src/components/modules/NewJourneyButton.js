import React, { Component } from "react";
import "./NewJourneyButton.css";
import { get, post } from "../../utilities";



/**
 * NewJourneyButton is the button component to add a new journey object to the JourneyFeed
 * Takes as props from JourneyFeed:
 * @togglePopup : function,
 * @addNewJourney : function,
 * @userId : String,
 */
class NewJourneyButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NewJourneyButton-button" onClick={this.props.togglePopup}>
        &nbsp; &nbsp; + New Journey &nbsp; &nbsp; &nbsp;
      </div>
    );
  }
};

export default NewJourneyButton;