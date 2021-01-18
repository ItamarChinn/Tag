import React, { Component } from "react";
//import "./NewProgress.css";

/**
 * What is this>
 */
class NewProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString(),
      goal_unit: "miles", //can we go over how to set this up?
      goal_progress: 0
    }
  }
  //lets talk about what needs to happen on the backend so this can actually do something? 
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="NewProgress-container">
        <form>
          <span>New Progress:</span>
          <span>{this.state.date}</span>
          <input type="number" name="goal_progress" placeholder="0" onChange={e => this.change(e)}></input>
          <span>{this.state.goal_unit}</span>
        </form>
      </div>
    );
  }
};

export default NewProgress;