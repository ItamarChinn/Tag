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
      progress_quantity: this.props.progress_quantity,
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

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }

  toggleEditingModeCancel = () => {
    this.setState({editingMode: !this.state.editingMode});
    }
  
  toggleEditingModeDelete = () => {
    this.setState({showDeletePopup: !this.state.showDeletePopup})
  }

  calculateExpected () {
    let totalTime = (Date.now() - Date.parse(this.props.startDate))/(60*60*24*1000);
    let expectedDays = Math.floor(totalTime);
    let expectedProgress = null;
  
    switch(this.props.goal_time_unit) {
        case "Day":
          return expectedProgress = expectedDays*this.props.goal_quantity;
        case "Week":
          return expectedProgress = expectedDays*this.props.goal_quantity/7;
        case "Month":
          return expectedProgress = expectedDays*this.props.goal_quantity/30;
        default:
          return expectedProgress = "no progress expected"
      }
    }

  render() {
    
    // Date parsing
    // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const timeProgress = new Date(this.props.datetime);

    let progress_number;
    if (this.state.editingMode) {
        progress_number= (<input type="number"
            name="progress_quantity"
            placeholder={this.state.progress_quantity}
            onChange={e => this.change(e)} />)
      } else {
        progress_number=this.state.progress_quantity
      }

      let positiveList = [
        "Good Job!",
        "Nice Going!",
        "Great Work!",
        "Keep it Up!"
      ]

      let negativeList = [
        "Almost there!",
        "Keep pushing!",
        "You suck!",
        "Every effort counts!"
      ]

      let positiveMessage = positiveList[Math.floor(Math.random()*positiveList.length)];
      let negativeMessage = negativeList[Math.floor(Math.random()*negativeList.length)];

    return (
      <div className="SingleProgress-divider1">
      <div className="SingleProgress-container">
        <div className="SingleProgress-subcontainer">
        {(this.state.editingMode) &&
          <div className="SingleProgress-decrement" onClick={this.decrementDown}>
            -
          </div>}
          {progress_number} {this.props.goal_unit}
          {this.state.editingMode &&
          <div className="SingleProgress-increment" onClick={this.incrementUp}>
            +
          </div>}
        </div>
        
        <div className="SingleProgress-subcontainer">
          {timeProgress.getHours()}:{(timeProgress.getMinutes()) < 10 ? "0" + timeProgress.getMinutes() : timeProgress.getMinutes()} &nbsp; {timeProgress.getDate()}-{timeProgress.getMonth()}-{timeProgress.getFullYear()}
        </div>
        <div className="SingleProgress-subcontainer">
          {this.calculateExpected()}
          {positiveMessage}
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