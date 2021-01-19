import React, { Component } from "react";
import {MdDelete, MdClose, MdDone, MdModeEdit} from 'react-icons/md';
import ConfirmDeletePopup from "../modules/ConfirmDeletePopup.js";
import "./SingleProgress.css";

/**
 * This is one line of progress in a journey
 * It inherits its properties from JourneyCard
 * 
 */

class SingleProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingMode: false,
      progress_quantity: null,
      showDeletePopup: false,
      }
    }


  componentDidMount() {
    this.setState({
      progress_quantity: Number(this.props.progress_quantity),
      editingMode: this.props.newInputedProgress,
    })
  }

  incrementUp = () => {
    this.setState({
      progress_quantity: this.state.progress_quantity + 1,
    })
  }

  decrementDown = () => {
    this.setState({
      progress_quantity: this.state.progress_quantity - 1,
    })
  }

  toggleEditingModeSave = () => {
    if (this.state.editingMode) {
      this.setState({editingMode: !this.state.editingMode});
      const updatedProgressObject = {
        progressId: this.props.progressId,
        progress_quantity: this.state.progress_quantity,
      }
      this.props.onIncrement(updatedProgressObject)
    } else {
      this.setState({editingMode: !this.state.editingMode});
    }
  }

  toggleEditingModeCancel = () => {
    this.setState({editingMode: !this.state.editingMode});
    }
  
  toggleEditingModeDelete = () => {
    this.setState({showDeletePopup: !this.state.showDeletePopup})
  }

  

  render() {
    
    // Date parsing
    // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const timeProgress = new Date(this.props.datetime);

    return (
      <div className="SingleProgress-divider1">
      <div className="SingleProgress-container">
        <div className="SingleProgress-subcontainer">
        {(this.state.editingMode & this.state.progress_quantity > 0) &&
          <div className="SingleProgress-decrement" onClick={this.decrementDown}>
            -
          </div>}
          {this.state.progress_quantity} {this.props.goal_unit}
          {this.state.editingMode &&
          <div className="SingleProgress-increment" onClick={this.incrementUp}>
            +
          </div>}
        </div>
        <div className="SingleProgress-subcontainer">
          {timeProgress.getHours()}:{(timeProgress.getMinutes()) < 10 ? "0" + timeProgress.getMinutes() : timeProgress.getMinutes()} &nbsp; {timeProgress.getDate()}-{timeProgress.getMonth()}-{timeProgress.getFullYear()}
        </div>
        <div className="SingleProgress-subcontainer">
          Nice Job!!
        </div>
        <div className="SingleProgress-subcontainer">
          {!this.state.editingMode ? 
          <>
          <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeDelete}><MdDelete /></div>
          <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeSave}><MdModeEdit/></div></>
          : <>
          <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeCancel}><MdClose /></div>
          <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeSave}><MdDone /></div></>}
          {this.state.showDeletePopup ?
        <ConfirmDeletePopup 
        progressId={this.props.progressId}
        deleteProgress={this.props.deleteProgress}
        closePopup={this.toggleEditingModeDelete}/> : null}
          {/* {this.props.progress_quantity} */}
        </div>
      </div>
      <div className="SingleProgress-divider">
        <hr />
      </div>
      </div>
        );
      }
    };

export default SingleProgress;