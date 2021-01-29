import React, { Component } from "react";
import "./ConfirmDeleteJourney.css";
import { get, post } from "../../utilities";


/**
 * ConfirmDeleteJourney is a component that sits on the entire page and asks you if you are sure you want 
 * to delete a JOURNEY (NOT progress!)
 * Takes as props from SingleProgress
 * @journeyId : String
 * @deleteProgress : function (in JourneyFeed.js)
 * @closePopup : function,
 */

class ConfirmDeleteJourney extends Component {
  constructor(props) {
    super(props);
  }

  deleteThisJourney = () => {
    this.props.deleteJourney(this.props.journeyId);
    this.props.closePopup();
  }

  render() {
    return (
      <div className="ConfirmDeleteJourney-popup">
        <div className='ConfirmDeleteJourney-popupinner'>
          <div className='ConfirmDeleteJourney-content'>
            Are you sure you wish to delete this journey?
              <div className="ConfirmDeleteJourney-buttonContainer">
              <div className="ConfirmDeleteJourney-button2" onClick={this.props.closePopup}>&nbsp; Cancel &nbsp;</div>
              <div className="ConfirmDeleteJourney-button" onClick={this.deleteThisJourney}>&nbsp; Delete &nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ConfirmDeleteJourney;