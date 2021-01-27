import React, { Component } from "react";
import "./ConfirmCompletePopup.css";
import {get, post} from "../../utilities";


/**
 * New Journey button.
 * Takes as props from Dashboard:
 * @userId : String
 * @addNewJourney : function
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
            Are you sure you wish to mark this journey as complete? You can always revert this decision later if you want to continue on your journey
            </center> 
            <div className = "ConfirmCompletePopup-buttonContainer">
            <div className="ConfirmCompletePopup-button2" onClick={this.props.closePopup}>&nbsp; Cancel &nbsp;</div>
            <div className="ConfirmCompletePopup-button" onClick={this.markAsCompleteJourney}>&nbsp; Complete &nbsp;</div>
          </div>
          </>
            : 
            <>
            <center>
            Are you sure you wish to mark this journey as incomplete? You can always revert this decision later if you want to continue on your journey
            </center> 
            <div className = "ConfirmCompletePopup-buttonContainer">
            <div className="ConfirmCompletePopup-button2" onClick={this.props.closePopup}>&nbsp; Cancel &nbsp;</div>
            <div className="ConfirmCompletePopup-button" onClick={this.markAsCompleteJourney}>&nbsp; Mark as incomplete &nbsp;</div>
          </div>
          </>
            }
              
            </div>
            </div>
          </div>
        );
  }
};

export default ConfirmCompletePopup;