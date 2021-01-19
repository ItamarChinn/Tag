import React, { Component } from "react";
// import "./JourneyDiagram.css";

/**
 * Journey Diagram showing your journey
 */
class JourneyDiagram extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={require("../Mock_journey_diagram.jpg")}/>
      </div>
    );
  }
};

export default JourneyDiagram;