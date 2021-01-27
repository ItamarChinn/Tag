import React, { Component } from "react";
import "./JourneyDiagram.css";

class ProgressChart extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
  
      return (
        <VictoryChart theme={VictoryTheme.material}> 
            <VictoryLine
                style={{
                    data: { stroke: "var(--darkblue)" },
                    parent: { border: "1px solid #ccc"}
                    }}
                data={[ progresses]}
            />
        </VictoryChart>
      );
    }
  };
  
  export default ProgressChart;