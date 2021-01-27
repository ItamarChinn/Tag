import React, { Component } from "react";
import "./ConfirmDeletePopup.css";
import {get, post} from "../../utilities";


/**
 * New Journey button.
 * Takes as props from Dashboard:
 * @userId : String
 * @addNewJourney : function
 */
class ConfirmDeletePopup extends Component {
  constructor(props) {
      super(props);
  }

  deleteThisProgress = () => {
    this.props.deleteProgress(this.props.progressId);
    this.props.closePopup();
  }

    render() {   
        return (
        <div className="ConfirmDeletePopup-popup">
            <div className='ConfirmDeletePopup-popupinner'> 
            <div className='ConfirmDeletePopup-content'>
            Are you sure you wish to delete this progress?
              <div className = "ConfirmDeletePopup-buttonContainer">
                <div className="ConfirmDeletePopup-button2" onClick={this.props.closePopup}>&nbsp; Cancel &nbsp;</div>
                <div className="ConfirmDeletePopup-button" onClick={this.deleteThisProgress}>&nbsp; Delete &nbsp;</div>
              </div>
            </div>
            </div>
          </div>
        );
  }
};

export default ConfirmDeletePopup;