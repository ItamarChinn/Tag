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
      data: this.getData(0)
    }
  }


  componentDidMount() {
    let percent = 25;
    this.setStateInterval = window.setInterval(() => {
      percent += (Math.random() * 25);
      percent = (percent > 100) ? 0 : percent;
      this.setState({
        percent, data: this.getData(percent)
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    const start = "🌎"
    const character = "🚀"
    const chaser = "🚀"
    const stationOne = "🌔"
    const stationTwo = "🌔"
    const stationThree = "🌔"
    const end = "🎖"



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


    return (
      <div className="JourneyDiagram-box">
        <div className="JourneyDiagram-line">
        <div className="JourneyDiagram-boxbox">
          <hr />
          </div>
        </div>

        <div className="JourneyDiagram-stations" >
          <div className="JourneyDiagram-center">{start}</div>
          <div className="JourneyDiagram-top">{stationOne}</div>
          <div className="JourneyDiagram-bottom">{stationTwo}</div>
          <div className="JourneyDiagram-top">{stationThree}</div>
          <div className="JourneyDiagram-center">{end}</div>
        </div>
        <div className="JourneyDiagram-progresscharacters" >
          <div className="JourneyDiagram-character">{character}</div>
          <div className="JourneyDiagram-chaser">{chaser}</div>
        </div>
      </div>
    );
  }
};

export default JourneyDiagram;