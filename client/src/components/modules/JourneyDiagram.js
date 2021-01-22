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
      

    
    return (
      // <>
      //   <svg viewBox="0 0 400 400" width="45%" height="auto">
      //     <VictoryPie
      //       standalone={false}
      //       animate={{ duration: 1000 }}
      //       width={400} height={400}
      //       data={this.state.data}
      //       innerRadius={120}
      //       cornerRadius={25}
      //       labels={() => null}
      //       style={{
      //         data: { fill: ({ datum }) => {
      //           const color = datum.y > 30 ? "green" : "red";
      //           return datum.x === 1 ? color : "darkblue";
      //         }
      //         }
      //       }}
      //     />
      //     <VictoryAnimation duration={1000} data={this.state}>
      //       {(newProps) => {
      //         return (
      //           <VictoryLabel
      //             textAnchor="middle" verticalAnchor="middle"
      //             x={200} y={200}
      //             text={`${Math.round(newProps.percent)}%`}
      //             style={{ fill:"white", fontSize: 45 }}
      //           />
      //         );
      //       }}
      //     </VictoryAnimation>
      //   </svg>
      // </>

        <>
        {/* <iframe src='https://my.spline.design/characterbunny-86db51a8f1186679e73f738622170256/' frameborder='0' width='100%' height='100%'></iframe> */}
        
        <div className="JourneyDiagram-box">
          <div className="JourneyDiagram-line">
            <div className="JourneyDiagram-box2">
              <div className="JourneyDiagram-start">{start}</div>
              <div className="JourneyDiagram-w1">
                <div className="JourneyDiagram-container">W1</div>
                <div className="JourneyDiagram-container">{stationOne}</div>
                </div>
              <div className="JourneyDiagram-w2">
                <div className="JourneyDiagram-w2">W2</div>
                <div className="JourneyDiagram-w2">{stationTwo}</div>
                </div>
              <div className="JourneyDiagram-w3">
                <div className="JourneyDiagram-w3">W3</div>
                <div className="JourneyDiagram-w3">{stationThree}</div>
              </div>
              <div className="JourneyDiagram-end">{end}</div>
            
            </div>
            </div>
        </div>
      </>
    );
  }
};

export default JourneyDiagram;