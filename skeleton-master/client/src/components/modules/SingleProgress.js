import React, { Component } from "react";
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
      }
    }

  // change = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }

    



  render() {
    let to_render = null;
    if (this.props.progress_quantity == 0 | this.state.editingMode) {
      to_render = 
      // <div className="NewProgressButton-container">
      //   <form>
      //     <span>New Progress:</span>
      //     <span>{this.props.datetime}</span>
      //     <input type="number" name="goal_progress" placeholder="0" onChange={e => this.change(e)}></input>
      //     <span>{this.state.goal_unit}</span>
      //   </form>
      // </div>
      <div className="u-inlineBlock">
        {this.props.progress_quantity} {this.props.goal_unit} 
        <hr className="u-inlineBlock" style={{width: "1px", height: "20px", display: "inline-block",}}/> 
        {this.props.datetime} 
        <hr style={{width: "1px", height: "20px", display: "inline-block",}}/>
        <div className="u-inlineBlock">
          Nice Job!!
        </div>
        <hr className="u-inlineBlock" style={{width: "1px", height: "20px", display: "inline-block",}}/>
        <div className="SingleProcess-decrement u-inlineBlock">
          -
        </div>
        {this.props.progress_quantity}
        <div className="SingleProcess-increment u-inlineBlock">
          +
        </div>
      </div>
    } else {
      to_render =  <div className="SingleProgress-container">
          This is a test progress
      <span>{this.props.datetime}</span>
      </div>
    }
    return (
      <div>
        {to_render}
      </div>
        );
      }
    };

export default SingleProgress;