import React, { Component } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import "./JourneyDiagram.css";

/**
 * Journey Diagram showing your journey
 */
class JourneyDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 25,
      data: this.getData(0),
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
    if (this.state.theme == "space") {
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

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    let actualFractionComplete = 50;
    let expectedFractionComplete = 25;
    let characterProgress = actualFractionComplete;
    let chaserProgress = expectedFractionComplete;


    document.documentElement.style.setProperty(
      '--characterProgress',
      String(characterProgress) + "%"
    )

    document.documentElement.style.setProperty(
      '--chaserProgress',
      String(chaserProgress) + "%"
    )

    document.documentElement.style.setProperty(
      '--backgroundTheme',
      this.state.backgroundTheme
    )

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