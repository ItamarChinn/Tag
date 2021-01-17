import React, { Component } from "react";
import "./JourneyCard.css";
import "../App.js";
import "./NewProgress.js"
import "./ProgressCard.js"


class JourneyCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <div className="JourneyCard-container"> This is a journey card </div>
     <div className="JourneyCard-container"> 
        <div className= "JourneyCard-title u-inlineBlock"> 
        {this.props.goal_name}: {this.props.goal_quantity} {this.props.goal_unit}, {this.props.goal_frequency} times per {this.props.goal_time_unit}
        </div>
      </div>
        )
        {/* <div className="JourneyCard-padding">
          <NewProgress />
          <div className = "JourneyCard-display"> 
            <ProgressCard /> */}
          
        // </div>
    // </div>
    
  }
};

export default JourneyCard;