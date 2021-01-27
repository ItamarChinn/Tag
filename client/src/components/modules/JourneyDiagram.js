import React, { Component } from "react";
import "./JourneyDiagram.css";
import "../../public/night_sky.jpg";

/**
 * Journey Diagram showing your journey
 */
class JourneyDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      character: null,
      chaser: null,
      stationOne: null,
      stationTwo: null,
      stationThree: null,
      end: null,
      backgroundTheme: null,
      completionPicture: null,
    }
  }


  componentDidMount() {
    if (this.props.theme == "space") {
      this.setState({
        start: "🌎",
        character: "🚀",
        chaser: "🛸",
        stationOne: "☄️",
        stationTwo: "🌌",
        stationThree: "🪐",

        end: "☀️",
        backgroundTheme: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,104,172,1) 100%, rgba(0,212,255,1) 100%)",
        completionPicture: "url('night_sky.jpg')",
      })
    } else if (this.props.theme == "forest") {
      this.setState({
        start: "🏡",
        character: "🤸",
        chaser: "🐯",
        stationOne: "🐘",
        stationTwo: "🌲",
        stationThree: "🐒",
        end: "⛺",
        backgroundTheme: "linear-gradient(90deg, rgba(112,177,53,1) 0%, rgba(49,82,3,1) 100%, rgba(0,212,255,1) 100%)",
      })
    } else if (this.props.theme == "ocean") {
      this.setState({
        start: "🏖️",
        character: "⛵",
        chaser: "🦈",
        stationOne: "🐙",
        stationTwo: "🐬",
        stationThree: "🐚",
        end: "🏝️",
        backgroundTheme: "linear-gradient(90deg, rgba(0,80,223,1) 0%, rgba(42,135,123,1) 100%, rgba(0,212,255,1) 100%)"
      })
    };
  };


  render() {
    let actualFractionComplete = this.props.actualProgress/(this.props.goal_quantity * this.props.goal_frequency);
    if (actualFractionComplete > 1) {
      actualFractionComplete = 1;
    }

    let expectedFractionComplete = null;
    const current_date = new Date();
    const date = String(current_date.getDate());
    const day = String(current_date.getDay());
    const hour = String(current_date.getHours());

    if (this.props.goal_time_unit === "Day") {
       expectedFractionComplete = hour / 24;
     } else if (this.props.goal_time_unit === "Week") {
        expectedFractionComplete = day / 7;
        console.log(this.props.actualProgress)
        console.log(this.props.goal_quantity)
        console.log(this.props.goal_frequency)
        console.log(actualFractionComplete);
     } else if (this.props.goal_time_unit === "Month") {
      expectedFractionComplete = date / 31;
    }

    const bgStyle = {
      background: this.state.backgroundTheme,
    }

    const lineProgressStyle = {
      width: String(100 * actualFractionComplete) + "%",
    }

    const characterProgressStyle = {
      width: String(100 * actualFractionComplete + 2) + "%",
    }

    const chaserProgressStyle = {
      width: String(100 * expectedFractionComplete) + "%"
    }
  
    let tag_message = String("Great work staying on top of your goals!");
    if (expectedFractionComplete - actualFractionComplete > 0) {
      tag_message = String("Oh no! Keep up and don't get tagged.");} 
    else if (actualFractionComplete == 1) {
      tag_message = String("Congrats! You're chasing your dreams :)")
    }


    return (
      <div className="JourneyDiagram-box" style={bgStyle}>
        <div className="JourneyDiagram-line">
          <div className="JourneyDiagram-boxbox" style={lineProgressStyle}>
            <hr className="progress" />
          </div>
        </div>
        <div className="JourneyDiagram-stations" >
          <div className="JourneyDiagram-center">{this.state.start}</div>
          <div className="JourneyDiagram-top">
            <div>
              <div className="JourneyDiagram-progresstext"> You're on your way :) </div>
              {this.state.stationOne}
            </div>
          </div>
          <div className="JourneyDiagram-bottom">
            <div>
              <div>{this.state.stationTwo} 
                <div className="JourneyDiagram-progresstext"> Halfway </div>
              </div>
            </div>
          </div>
          <div className="JourneyDiagram-top">
            <div className="JourneyDiagram-progresstext"> Almost there! </div>
            {this.state.stationThree}
          </div>
          <div className="JourneyDiagram-center"> 
            {this.state.end}
            <div className="JourneyDiagram-tagmessage"> {tag_message} </div> 
          </div>
        </div>
        <div className="JourneyDiagram-progresscharacters" >
          <div className="JourneyDiagram-character" style={characterProgressStyle}>{this.state.character}</div>
          <div className="JourneyDiagram-chaser" style={chaserProgressStyle}>{this.state.chaser}</div>
        </div>
      </div>
    );
  }
};

export default JourneyDiagram;