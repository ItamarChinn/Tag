import React, { Component } from "react";
import { MdDelete, MdClose, MdDone, MdModeEdit } from 'react-icons/md';
import ConfirmDeletePopup from "../modules/ConfirmDeletePopup.js";
import DatePicker from "react-datepicker";
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
      comment: null,
      datetime: null,
    }
  }


  componentDidMount() {
    this.setState({
      progress_quantity: this.props.progress_quantity,
      editingMode: this.props.newInputedProgress,
      datetime: this.props.datetime,
      comment: this.props.comment,
    })
  }

  incrementUp = () => {
    this.setState({
      progress_quantity: parseInt(this.state.progress_quantity) + 1,
    })
  }

  decrementDown = () => {
    this.setState({
      progress_quantity: parseInt(this.state.progress_quantity) - 1,
    })
  }

  toggleEditingModeSave = () => {
    if (this.state.progress_quantity < 0) { alert("Must move forwards! Please enter positive progress") }
    else if (this.state.editingMode) {
      this.setState({ editingMode: !this.state.editingMode });
      const updatedProgressObject = {
        progressId: this.props.progressId,
        progress_quantity: this.state.progress_quantity,
        datetime: this.state.datetime,
        comment: this.state.comment,
      }
      this.props.onIncrement(updatedProgressObject)
    } else {
      this.setState({ editingMode: !this.state.editingMode });
    }
  }

  change = (e) => {
      if (e.target.value === null) {
        this.setState({[e.target.name]: 0})
      } else {
        this.setState({[e.target.name]: e.target.value})
      }
    };
  }



  toggleEditingModeCancel = () => {
    // if (this.state.progress_quantity === 0) {
    //   this.toggleEditingModeDelete()
    // } else {
    this.setState({ editingMode: !this.state.editingMode });
    // }
  }

  toggleEditingModeDelete = () => {
    this.setState({ showDeletePopup: !this.state.showDeletePopup })
  }

  setDateTime = (date) => {
    this.setState({
      datetime: new Date(date)
    })
  }

  render() {
    let timeStamp = null;
    let commentBox = null;
    let progress_number=null;
    
    // Date parsing
    const timeProgress = new Date(Date.parse(this.state.datetime))

    
    if (this.state.editingMode) {
      progress_number = (<input className="SingleProgress-numberinput"
        type="number"
        name="progress_quantity"
        min={0}
        placeholder={this.state.progress_quantity}
        onChange={e => this.change(e)} />)
      timeStamp = (<DatePicker
        selected={new Date(this.state.datetime)}
        onChange={date => this.setDateTime(date)}
        timeIntervals={15}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeSelect
        popperPlacement="top-end"
      />)
      commentBox = <input type="text" name="comment" placeholder={this.state.comment} onChange={e => this.change(e)}/>
    } else {
      progress_number = this.state.progress_quantity;
      timeStamp = <>{timeProgress.getHours()} :{(timeProgress.getMinutes()) < 10 ? "0" + timeProgress.getMinutes() : timeProgress.getMinutes()} &nbsp; {timeProgress.getDate()}-{timeProgress.getMonth() + 1}-{timeProgress.getFullYear()}</>
      commentBox = this.state.comment;
    }

    return (
      <>
      {this.state.showDeletePopup ?
            <ConfirmDeletePopup
              progressId={this.props.progressId}
              deleteProgress={this.props.deleteProgress}
              closePopup={this.toggleEditingModeDelete} /> : null}
        <div className="SingleProgress-subcontainer_left u-inlineBlock">
          {(this.state.editingMode && this.state.progress_quantity > 0) &&
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
          {timeStamp}
        </div>
        <div className="SingleProgress-subcontainer_center">
          {commentBox}
        </div>
        <div className="SingleProgress-subcontainer_right">
          {!this.state.editingMode ?
            <div className="u-inlineBlock">
              <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeDelete}><MdDelete /></div>
              <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeSave}><MdModeEdit /></div></div>
            : <div className="u-inlineBlock">
              <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeCancel}><MdClose /></div>
              <div className="SingleProgress-togglebutton" onClick={this.toggleEditingModeSave}><MdDone /></div></div>}
          
        </div>
      </>
    );
  }
};

export default SingleProgress;