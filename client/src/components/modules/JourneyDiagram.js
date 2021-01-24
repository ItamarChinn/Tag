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
      characterProgress: null,
      chaserProgress: null,
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
        backgroundTheme: "linear-gradient(45deg, rgba(0,7,66,1) 0%, rgba(0,0,0,1) 21%, rgba(12,7,62,1) 50%, rgba(5,3,26,1) 80%, rgba(0,6,59,1) 100%);",
      })
    } else {
      this.setState({
        start: "🏠",
        character: "🚶🏽‍♀️",
        chaser: "🐺",
        stationOne: "🌲",
        stationTwo: "🍁",
        stationThree: "🏔️",
        end: "🎖",
        backgroundTheme: "linear-gradient(45deg, rgba(0,66,8,1) 0%, rgba(17,107,17,1) 18%, rgba(181,51,0,1) 40%, rgba(134,0,0,1) 62%, rgba(255,192,212,1) 83%, rgba(255,255,255,1) 100%);",
      })
    }
  };


  render() {
    let actualFractionComplete = 50;
    let expectedFractionComplete = 25;
    let characterProgress = actualFractionComplete;
    let chaserProgress = expectedFractionComplete;
    let bg_color = this.state.backgroundTheme;

    console.log(bg_color)

    const element = document.documentElement;

    element.style.setProperty(
      '--characterProgress',
      String( Math.random() * 100)  + "%"
    )

    element.style.setProperty(
      '--chaserProgress',
      String(Math.random() * 100) + "%"
    )

    // element.style.setProperty(
    //   '--backgroundTheme',
    //   bg_color
    // )

    return (
      <div className="JourneyDiagram-box">
        <div className="JourneyDiagram-line">
          <div className="JourneyDiagram-boxbox">
            <hr className="progress" />
          </div>
        </div>

        <div className="JourneyDiagram-stations" >
          <div className="JourneyDiagram-center">{this.state.start}</div>
          <div className="JourneyDiagram-top">{this.state.stationOne}</div>
          <div className="JourneyDiagram-bottom">{this.state.stationTwo}</div>
          <div className="JourneyDiagram-top">{this.state.stationThree}</div>
          <div className="JourneyDiagram-center">{this.state.end}</div>
        </div>
        <div className="JourneyDiagram-progresscharacters" >
          <div className="JourneyDiagram-character">{this.state.character}</div>
          <div className="JourneyDiagram-chaser">{this.state.chaser}</div>
        </div>
      </div>
    );
  }
};

export default JourneyDiagram;