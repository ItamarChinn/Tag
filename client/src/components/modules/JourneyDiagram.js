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
        stationOne: "🌔",
        stationTwo: "🪐",
        stationThree: "☄️",
        end: "🎖",
        backgroundTheme: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,104,172,1) 100%, rgba(0,212,255,1) 100%)",
        completionPicture: "url('night_sky.jpg')",
      })
    } else if (this.props.theme == "forest") {
      this.setState({
        start: "🏠",
        character: "🤸",
        chaser: "🐺",
        stationOne: "🌲",
        stationTwo: "🍁",
        stationThree: "🏔️",
        end: "🎖",
        backgroundTheme: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(30,74,28,1) 100%, rgba(0,212,255,1) 100%)",
      })
    } else if (this.props.theme == "ocean") {
      this.setState({
        start: "🏠",
        character: "⛵",
        chaser: "🦈",
        stationOne: "🏖️",
        stationTwo: "🐬",
        stationThree: "🐚",
        end: "🎖",
        backgroundTheme: "linear-gradient(45deg, rgba(0,23,98,1) 0%, rgba(1,44,153,1) 35%, rgba(0,70,226,1) 63%, rgba(0,159,255,1) 100%)"
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

    if (this.props.goal_time_unit === "Day") {
       expectedFractionComplete = this.props.goal_quantity;
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
      background: this.state.completionPicture,
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
  
    


    return (
      <div className="JourneyDiagram-box" style={bgStyle}>
        <div className="JourneyDiagram-line">
          <div className="JourneyDiagram-boxbox" style={lineProgressStyle}>
            <hr className="progress" />
          </div>
        </div>
        <div className="JourneyDiagram-stations" >
          <div className="JourneyDiagram-center">{this.state.start}</div>
          <div className="JourneyDiagram-top"><div><div className="JourneyDiagram-progresstext"> 1/4</div>{this.state.stationOne}</div></div>
          <div className="JourneyDiagram-bottom"><div><div>{this.state.stationTwo} <div className="JourneyDiagram-progresstext"> Halfway!</div></div></div></div>
          <div className="JourneyDiagram-top"><div className="JourneyDiagram-progresstext"> 3/4</div>{this.state.stationThree}</div>
          <div className="JourneyDiagram-center">{this.state.end}</div>
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