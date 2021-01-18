import React, { Component } from "react";
import "./JourneyCard.css";
import "../App.js";
import NewProgress from "./NewProgress.js"
import ProgressCard from "./ProgressCard.js"


class JourneyCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div className="JourneyCard-container"> 
          <div className= "JourneyCard-title"> 
          {this.props.goal_name}: {this.props.goal_quantity} {this.props.goal_unit}, {this.props.goal_frequency} times per {this.props.goal_time_unit}
          </div>
          <ProgressCard />
    </div>)
          /* <NewProgress />
          <div className = "JourneyCard-display"> 
            <ProgressCard /> */
  }
};

export default JourneyCard;