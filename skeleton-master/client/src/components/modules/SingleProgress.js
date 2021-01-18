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
      // date: new Date().toLocaleString(),
      editingMode: false,
      }
    }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let to_render = null;
    if (this.props.progress_quantity == 0 | this.state.editingMode) {
      to_render = <div className="NewProgressButton-container">
        <form>
          <span>New Progress:</span>
          {/* <span>{this.state.date}</span> */}
          <input type="number" name="goal_progress" placeholder="0" onChange={e => this.change(e)}></input>
          <span>{this.state.goal_unit}</span>
        </form>
      </div>
    } else {
      to_render =  <div className="SingleProgress-container">
          This is a test progress
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