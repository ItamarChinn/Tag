import React, { Component } from "react";
import {MdDelete, MdClose, MdDone, MdModeEdit} from 'react-icons/md';
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
      progress_quantity: 0,
      }
    }

  // change = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }

  componentDidMount() {
    this.setState({
      progress_quantity: this.props.progress_quantity
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
  
/* <hr className="" style={{width: "1px", height: "20px", display: "inline-block",}}/>  */

  

  render() {
    
    // Date parsing
    // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const timeProgress = new Date(this.props.datetime);

    return (
      <div className="SingleProgress-divider1">
      <div className="SingleProgress-container">
        <div className="SingleProgress-subcontainer">
        {(this.state.editingMode & this.props.progress_quantity > 0) &&
          <div className="SingleProcess-decrement" onClick={this.decrementDown}>
            -
          </div>}
          {this.state.progress_quantity} {this.props.goal_unit}
          {this.state.editingMode &&
          <div className="SingleProcess-increment" onClick={this.incrementUp}>
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
          <div onClick={this.toggleEditingMode}><MdModeEdit/></div>
          : <>
          <div onClick={this.toggleEditingModeCancel}><MdClose /></div>
          <div onClick={this.toggleEditingModeSave}><MdDone /></div>
          <div onClick={this.toggleEditingModeDelete}><MdDelete /></div></>}
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