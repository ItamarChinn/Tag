import React, { Component } from "react";
import SingleProgress from "./SingleProgress.js"
import NewProgress from "./NewProgress.js"
//import "./ProgressCard.css";

/**
 * What is this>
 */
class ProgressCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progresses: []
    }
  }



  render() {
    return (
      <div className="ProgressCard-container">
          This is a test component
          <NewProgress />
      </div>
      // <NewProgress />
      //<SingleProgress />
    );
  }
};

export default ProgressCard;