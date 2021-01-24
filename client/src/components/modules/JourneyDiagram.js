import React, { Component } from "react";
import "./JourneyDiagram.css";

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
        backgroundTheme: "linear-gradient(45deg, rgba(0,7,66,1) 0%, rgba(0,0,0,1) 21%, rgba(12,7,62,1) 50%, rgba(5,3,26,1) 70%, rgba(0,6,59,1) 100%)",
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
        backgroundTheme: "linear-gradient(45deg, rgba(0,66,8,1) 0%, rgba(17,107,17,1) 18%, rgba(181,51,0,1) 40%, rgba(134,0,0,1) 62%, rgba(255,192,212,1) 70%, rgba(255,255,255,1) 82%, rgba(255,255,255,1) 100%)",
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
    let actualFractionComplete = 50;
    let expectedFractionComplete = 25;


    const bgStyle = {
      background: this.state.backgroundTheme
    }

    const lineProgressStyle = {
      width: String(actualFractionComplete) + "%",
    }

    const characterProgressStyle = {
      width: String(actualFractionComplete + 2) + "%",
    }

    const chaserProgressStyle = {
      width: String(expectedFractionComplete) + "%"
    }



    return (
      <div className="JourneyDiagram-box" style={bgStyle}>
        <div className="JourneyDiagram-line">
          <div className="JourneyDiagram-boxbox" style={lineProgressStyle}>
            <hr className="progress" />
          </div>
        </div>

        <div className="JourneyDiagram-stations" >
        <div className="JourneyDiagram-progresstext"></div>
          <div className="JourneyDiagram-progresstext"> 1/4</div>
          <div className="JourneyDiagram-progresstext" style={{alignSelf: "flex-end"}}> 1/2</div>
          <div className="JourneyDiagram-progresstext"> 3/4</div>
          <div className="JourneyDiagram-progresstext"></div>
        </div>
        <div className="JourneyDiagram-stations" >
          <div className="JourneyDiagram-center">{this.state.start}</div>
          <div className="JourneyDiagram-top">{this.state.stationOne}</div>
          <div className="JourneyDiagram-bottom">{this.state.stationTwo}</div>
          <div className="JourneyDiagram-top">{this.state.stationThree}</div>
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