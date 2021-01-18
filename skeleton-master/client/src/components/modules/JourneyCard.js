import React, { Component } from "react";
import {get, post} from "../../utilities";
import "./JourneyCard.css";
import "../App.js";
import NewProgressButton from "../modules/NewProgressButton.js"
import SingleProgress from "../modules/SingleProgress.js"
// import JourneyDiagram from "../modules/JourneyDiagram.js"


class JourneyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progresses: [],
      totalProgress: 0,
    }
  }


  componentDidMount () {
    get("/api/progress", { 
      journeyId: this.props.journeyId
    })
    .then((progressObjs) => { 
      // let reversedJourneyObjs = journeyObjs.;
      progressObjs.map((progressObj) => {
        this.setState({ 
          progresses: this.state.progresses.concat([progressObj]),
          totalProgress: this.state.totalProgress + progressObj.progress_quantity 
        });
      });
    });
    // this.setState({journeys: this.state.journeys.reverse()});
  }


  onIncrement = (progressObject) => {
   // update progress on mongodb
    get("/api/editprogress", { 
      progressId: progressObject.progressId,
      updatedProgress: progressObject.progress_quantity
    })
   // update progress in state 
    .then((progressObj) => {
      // iterate over the list of progress objects and if I find one whos ID is 
      // the same as the one I just edited on the DB then update it 
        let proglist = this.state.progresses;
        for (let i = 0; i < this.state.progresses.length; i++) {
          if (this.state.progresses[i]._id === progressObj._id) {    
            proglist[i] = progressObj;
          }
        }
        // ive updated all the progresses that need changing, now just update state and rerender
        this.setState({progresses: proglist});
    });
  }

  addNewProgress = () => {
    const body = { 
        journeyId: this.props.journeyId,
        progress_quantity: 0,
        goal_unit: this.props.goal_unit,
        datetime: Date.now(),
      };

      post("/api/progress", body).then((progressObj) => {
        this.setState({
          progresses: [progressObj].concat(this.state.progresses),
          totalProgress: this.state.totalProgress + progressObj.progress_quantity,
          datetime: progressObj.datetime
          });
        });
    };
  

  render() {
    let progressList = null; 
    let newProgressButton = null;
    const hasProgress = this.state.progresses.length !== 0;
    
    if (hasProgress) { 
      progressList = this.state.progresses.map((progressObj) => 
          (<SingleProgress key={`Card_${progressObj._id}`} 
          journeyId={progressObj.journeyId}
          progressId={progressObj._id}
          progress_quantity={progressObj.progress_quantity}
          goal_unit={progressObj.goal_unit}
          datetime={progressObj.datetime}
          onIncrement={this.onIncrement}
          />));
    } else {
      progressList = <div>No progress! Start logging your progress</div>
    }
    if (!this.props.completed) {
      newProgressButton = <NewProgressButton 
                            addNewProgress={this.addNewProgress} 
                            userId={this.props.userId}
                            journeyId={this.props.journeyId}
                            goal_unit={this.props.goal_unit}
                            addNewProgress={this.addNewProgress}/>
      }
    
    
    return ( 
        <div className="JourneyCard-container"> 
          <div className= "JourneyCard-title"> 
            {this.props.goal_name}: {this.props.goal_quantity} {this.props.goal_unit}, {this.props.goal_frequency} times per {this.props.goal_time_unit}
          </div>
          <div className= "JourneyCard-title"> 
            Start {this.props.startDate}  - Finish {this.props.endDate} 
            {/* {console.log(this.props.startDate[1:10])} */}
          </div>
          <div className= "JourneyCard-title"> 
            Total Progress : {this.state.totalProgress}
          </div>
          <img src={require("../../public/Mock_journey_diagram.png")}/>
          {newProgressButton}
          {progressList}
        </div>
    );
  }
};

export default JourneyCard;