﻿import React, { Component } from "react";
import {get, post} from "../../utilities";
import "./JourneyCard.css";
import "../App.js";
import NewProgressButton from "../modules/NewProgressButton.js"
import SingleProgress from "../modules/SingleProgress.js"
import { MdExpandMore, MdExpandLess} from 'react-icons/md';
import JourneyDiagram from "../modules/JourneyDiagram.js"


class JourneyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progresses: [],
      totalProgress: 0,
      showProgress: true,
    }
  }


  componentDidMount () {
    get("/api/progress", { 
      journeyId: this.props.journeyId
    })
    .then((progressObjs) => { 
      let reversedProgressObjs = progressObjs.reverse();
      reversedProgressObjs.map((progressObj) => {
        this.setState({ 
          progresses: this.state.progresses.concat([progressObj]),
          totalProgress: this.state.totalProgress + progressObj.progress_quantity 
        });
      });
        this.setState({showProgress: this.props.isMostRecent})
    });
    // this.setState({journeys: this.state.journeys.reverse()});
  }


  onIncrement = (progressObject) => {
   // update progress on mongodb
    post("/api/editprogress", { 
      progressId: progressObject.progressId,
      updatedProgress: progressObject.progress_quantity
    })
   // update progress in state 
    .then((progressObj) => {
      // iterate over the list of progress objects and if I find one whos ID is 
      // the same as the one I just edited on the DB then update it 
        let proglist = [...this.state.progresses];
        let newTotalProgress = 0;
        for (let i = 0; i < this.state.progresses.length; i++) {
          if (this.state.progresses[i]._id === progressObj._id) {    
            proglist[i] = progressObj;
            newTotalProgress += progressObj.progress_quantity;
          } else {newTotalProgress += proglist[i].progress_quantity}
        }
        // ive updated all the progresses that need changing, now just update state and rerender
        this.setState({progresses: proglist, totalProgress: newTotalProgress});
    });
  }

  toggleToggle = () => {
    this.setState({showProgress: !this.state.showProgress})
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
  
  deleteProgress = (progressId) => {
    // update progress on mongodb
     post("/api/deleteprogress", { 
       progressId: progressId,
     })
    // update progress in state 
     .then((progress) => {
       console.log(progress);
       // iterate over the list of progress objects and if I find one whos ID is 
       // the same as the one I just edited on the DB then update it 
         let newTotalProgress = this.state.totalProgress;
         let indToRemove = null;
         for (let i = 0; i < this.state.progresses.length; i++) {
           if (this.state.progresses[i]._id === progress._id) {    
              indToRemove = i;
              newTotalProgress -= this.state.progresses[i].progress_quantity;
           }} 
          let proglist = [...this.state.progresses];
          proglist.splice(indToRemove, 1);
         // ive updated all the progresses that need changing, now just update state and rerender
         this.setState({progresses: proglist, totalProgress: newTotalProgress});
     });
   }


  capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
          deleteProgress={this.deleteProgress}
          newInputedProgress={progressObj._id === this.state.progresses[0]._id}
          />));
    } else {
      progressList = <div className="JourneyCard-noprogress">Hit <NewProgressButton 
      addNewProgress={this.addNewProgress} 
      userId={this.props.userId}
      journeyId={this.props.journeyId}
      goal_unit={this.props.goal_unit}
      addNewProgress={this.addNewProgress}/> to start logging your progress</div>
    }
    if (!this.props.completed) {
      newProgressButton = <NewProgressButton 
                            addNewProgress={this.addNewProgress} 
                            userId={this.props.userId}
                            journeyId={this.props.journeyId}
                            goal_unit={this.props.goal_unit}
                            addNewProgress={this.addNewProgress}/>
      }

      // Date parsing
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const start_date = new Date(this.props.startDate);
      const end_date = new Date(this.props.endDate);
    
    return ( 
        <div className="JourneyCard-container">
          <div className="JourneyCard-journey">
          <div className="JourneyCard-subcontainer">
            {/* Goal title */}
            <div className= "JourneyCard-title"> 
              {this.props.goal_name} 
            </div>
          {/* The actual goal */}
          <div className="JourneyCard-subcontainer2">
            <div className= "JourneyCard-title"> 
              {this.props.goal_quantity} {this.props.goal_unit}, {this.props.goal_frequency} times per {this.props.goal_time_unit}
            </div>
            <div className= "JourneyCard-subtitle"> 
              {this.state.totalProgress} {this.props.goal_unit} out of {this.props.goal_frequency * this.props.goal_quantity} this {this.props.goal_time_unit}
            </div>
          </div>
        </div>
        <div className="JourneyCard-subcontainer4">
          {/* <div className="JourneyCard-subcontainer3">
            <div className="JourneyCard-subtitle2">Expected</div>
            <div className="JourneyCard-subtitle2">Actual</div>
          </div> */}
          <div className="JourneyCard-subcontainer3">
            <JourneyDiagram
            totalProgress={this.state.totalProgress}
            startDate={start_date}
            endDate={end_date}
            />
            {/* <JourneyDiagram
            totalProgress={this.state.totalProgress}
            startDate={start_date}
            endDate={end_date}
            /> */}
          </div>
        </div>
          <div className="JourneyCard-subcontainer">
            <div className= "JourneyCard-subtitle"> Start {start_date.getDate()} {monthNames[start_date.getMonth()]} {start_date.getFullYear()} </div>
            <div className= "JourneyCard-subtitle"> Finish {end_date.getDate()} {monthNames[end_date.getMonth()]} {end_date.getFullYear()} </div>
          </div>
          </div>
          <div className= "JourneyCard-progresstoggler">
          <div className="JourneyCard-subcontainer">
            {this.state.showProgress ? <div className="JourneyCard-togglebutton" onClick={this.toggleToggle}><MdExpandLess/></div> :  <div className="JourneyCard-togglebutton" onClick={this.toggleToggle}><MdExpandMore/></div>}
            {newProgressButton}
          </div>

          {this.state.showProgress && <div className="JourneyCard-progresslist">
          <div className="JourneyCard-subcontainer">
            <div className= "JourneyCard-subtitle"> {this.capitalizeFirstLetter(this.props.goal_unit)} </div>
            <div className= "JourneyCard-subtitle"> Time </div>
            <div className= "JourneyCard-subtitle"> Comments </div>
            <div className= "JourneyCard-subtitle"> Edit </div>
          </div>
          <hr />
          {progressList}
          </div>}
          
          </div>
          <br/>
        </div>
    );
  }
};

export default JourneyCard;