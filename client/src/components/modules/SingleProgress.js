import React, { Component } from "react";
import { MdDelete, MdClose, MdDone, MdModeEdit } from 'react-icons/md';
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
      this.setState({ editingMode: !this.state.editingMode });
      const updatedProgressObject = {
        progressId: this.props.progressId,
        progress_quantity: this.state.progress_quantity,
      }
      this.props.onIncrement(updatedProgressObject)
    } else {
      this.setState({ editingMode: !this.state.editingMode });
    }
  }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }

  toggleEditingModeCancel = () => {
    this.setState({ editingMode: !this.state.editingMode });
  }

  toggleEditingModeDelete = () => {
    this.setState({ showDeletePopup: !this.state.showDeletePopup })
  }

  messagePicker = () => {
    let message = "";
    let positiveList = [
      "Good Job!",
      "Nice Going!",
      "Great Work!",
      "Keep it Up!"
    ]

    let negativeList = [
      "Almost there!",
      "Keep pushing!",
      "Great Effort!",
      "Every bit counts!"
    ]

    if (this.props.progressDifference <= 0) {
      return message = positiveList[Math.floor(Math.random() * positiveList.length)];
    } else {
      return message = negativeList[Math.floor(Math.random() * negativeList.length)];
    }
  }

  render() {

    // Date parsing
    const timeProgress = new Date(this.props.datetime);

    let progress_number;
    if (this.state.editingMode) {
      progress_number = (<input type="number"
        name="progress_quantity"
        placeholder={this.state.progress_quantity}
        onChange={e => this.change(e)} />)
    } else {
      progress_number = this.state.progress_quantity
    }

    return (
      <>
        {/* <div className="SingleProgress-divider1"> */}
        {/* <div className="SingleProgress-container"> */}
        <div className="SingleProgress-subcontainer_left u-inlineBlock">
          {(this.state.editingMode) &&
            <div className="SingleProgress-decrement u-inlineBlock" onClick={this.decrementDown}>
              -
          </div>}
          {progress_number} {this.props.goal_unit}
          {this.state.editingMode &&
            <div className="SingleProgress-increment u-inlineBlock" onClick={this.incrementUp}>
              +
          </div>}
        </div>

        <div className="SingleProgress-subcontainer_center">
          {timeProgress.getHours()}:{(timeProgress.getMinutes()) < 10 ? "0" + timeProgress.getMinutes() : timeProgress.getMinutes()} &nbsp; {timeProgress.getDate()}-{timeProgress.getMonth()}-{timeProgress.getFullYear()}
        </div>
        <div className="SingleProgress-subcontainer_center">
          {this.messagePicker()}
        </div>
        <div className="SingleProgress-subcontainer_right">
          {!this.state.editingMode ?
            <div className="u-inlineBlock">
              <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeDelete}><MdDelete /></div>
              <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeSave}><MdModeEdit /></div></div>
            : <div className="u-inlineBlock">
              <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeCancel}><MdClose /></div>
              <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeSave}><MdDone /></div></div>}
          {this.state.showDeletePopup ?
            <ConfirmDeletePopup
              progressId={this.props.progressId}
              deleteProgress={this.props.deleteProgress}
              closePopup={this.toggleEditingModeDelete} /> : null}
        </div>
        {/* </div> */}
        {/* <div className="SingleProgress-divider"> */}

          {/* <hr className="here" /> */}
        {/* </div> */}
        {/* </div> */}
      </>
    );
  }
};

export default SingleProgress;