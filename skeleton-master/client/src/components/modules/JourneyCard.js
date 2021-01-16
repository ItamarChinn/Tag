import React, { Component } from "react";
import "./JourneyCard.css";
import "./App.js";


class JourneyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: userId,
      goal: {
        name: String,
        frequency: Number, 
        time_unit: Date, 
        goal_unit: String, 
        goal_quantity: Number }, 
      theme: Theme
    }
  }

  render() {
    return (
      <div className="JourneyCard-container"> 
        <p className= "JourneyCard-title"> 
        {this.props.name}: {this.props.goal_quantity} {this.props.goal_unit}, {this.props.frequency} times per {this.props.time_unit}
        </p>
        <div className="JourneyCard-padding">
          <NewProgress />
          <div className = "JourneyCard-display"> 
            <ProgressCard />
          </div>
        </div>
    </div>
    );
  }
};

export default JourneyCard;