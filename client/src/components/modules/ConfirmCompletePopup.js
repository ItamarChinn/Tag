import React, { Component } from "react";
import "./ConfirmCompletePopup.css";
import { get, post } from "../../utilities";


/**
 * ConfirmCompletePopup is a component that sits on the entire page and asks you if you are sure you want 
 * to mark a JOURNEY as complete (and thus move it to the Completed Journey list)
 * Takes as props from SingleProgress
 * @journeyId : String
 * @completeJourney : function (in JourneyFeed.js)
 * @closePopup : function,
 * @completed : Boolean,
 */

class ConfirmCompletePopup extends Component {
  constructor(props) {
    super(props);
  }

  markAsCompleteJourney = () => {
    this.props.completeJourney(this.props.journeyId, this.props.completed);
    this.props.closePopup();
  }

  render() {
    return (
      <div className="ConfirmCompletePopup-popup">
        <div className='ConfirmCompletePopup-popupinner'>
          <div className='ConfirmCompletePopup-content'>
            {(!this.props.completed) ?
              <>
                <center>
                  Are you sure you wish to mark this journey as complete? You can always revert this decision later if you want to continue on your journey.<br /> Referesh to see your changes.
            </center>
                <div className="ConfirmCompletePopup-buttonContainer">
                  <div className="ConfirmCompletePopup-button2" onClick={this.props.closePopup}>&nbsp; Cancel &nbsp;</div>
                  <div className="ConfirmCompletePopup-button" onClick={this.markAsCompleteJourney}>&nbsp; Complete &nbsp;</div>
                </div>
              </>
              :
              <>
                <center>
                  Are you sure you wish to mark this journey as incomplete? You can always revert this decision later if you want to end your journey again. <br /> Referesh to see your changes.
            </center>
                <div className="ConfirmCompletePopup-buttonContainer">
                  <div className="ConfirmCompletePopup-button2" onClick={this.props.closePopup}>&nbsp; Cancel &nbsp;</div>
                  <div className="ConfirmCompletePopup-button" onClick={this.markAsCompleteJourney}>&nbsp; Mark as incomplete &nbsp;</div>
                </div>
              </>
            }

          </div>
        </div >
      </div >
    );
  }
};

export default ConfirmCompletePopup;