import React, { Component } from "react";
import "./NewJourneyButton.css";
import {get, post} from "../../utilities";



/**
 * New Journey button.
 * Takes as props from Dashboard:
 * @userId : String
 * @addNewJourney : function
 */
class NewJourneyButton extends Component {
  constructor(props) {
      super(props);
  }

    render() {   
        return (
        // <div className="NewJourneyButton-container u-inlineBlock">
        <div className="NewJourneyButton-button" onClick={this.props.togglePopup}> 
          &nbsp; &nbsp; + New Journey &nbsp; &nbsp; &nbsp; 
        </div>
        // </div>
        );
  }
};

export default NewJourneyButton;