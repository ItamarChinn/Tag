import React, { Component } from "react";
import "./JourneyFeed.css";
import { get, post } from "../../utilities";
import JourneyCard from "../modules/JourneyCard.js"
import NewJourneyButton from "../modules/NewJourneyButton.js";
import NewJourneyPopup from "../modules/NewJourneyPopup.js"


/**
 * JourneyFeed is the feed of all the journeys we have created, 
 * it can be either an incompleted journey feed which has the option to add progress 
 * or a completed one which doesn't have the option to add progress and displays a different JourneyDiagram
 * It inherits its props from Dashboard:
 * @userId : String,
 * @completed : Boolean,
 * @partyMode : Boolean,
 * @toggleParty : function,
 */


class JourneyFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journeys: [],
      showPopup: false,
      remountKey: (new Date()).getTime(),
    }
  }

  componentDidMount() {
    get("/api/journey", {
      owner: this.props.userId,
      complete: this.props.completed
    })
      .then((journeyObjs) => {
        let reversedJourneyObjs = journeyObjs.reverse();
        reversedJourneyObjs.map((journeyObj) => {
          this.setState({ journeys: this.state.journeys.concat([journeyObj]) });
        });
      });
  }

  resetCounter = () => {
    this.setState({
      remountKey: (new Date()).getTime(),
    });
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }


  // this gets called when the user pushes "Submit" to add a new journey, so their
  // journey gets added to the screen right away
  addNewJourney = (journeyObj) => {
    this.setState({
      journeys: [journeyObj].concat(this.state.journeys),
    });
  };

  editJourney = (journeyObj) => {
    // update progress on mongodb
    post("/api/editjourney", {
      journeyId: journeyObj.journeyId,
      goal_name: journeyObj.goal_name,
      goal_frequency: journeyObj.goal_frequency,
      goal_time_unit: journeyObj.goal_time_unit,
      goal_quantity: journeyObj.goal_quantity,
      theme: journeyObj.theme,
      startDate: journeyObj.startDate,
      endDate: journeyObj.endDate,
    })
      // update progress in state 
      .then(
        (journeyObj) => {
          // iterate over the list of journey objects and if I find one whos ID is 
          // the same as the one I just edited on the DB then update it 
          let indToRemove = null;
          let journeylist = [...this.state.journeys];
          for (let i = 0; i < this.state.journeys.length; i++) {
            if (this.state.journeys[i]._id === journeyObj._id) {
              journeylist[i] = journeyObj;
            }
          }
          // ive updated all the journeys that need changing, now just update state and rerender
          this.setState({ journeys: journeylist });
          this.resetCounter()
        }
      );
  };

  deleteJourney = (journeyId) => {
    // update progress on mongodb
    post("/api/deletejourney", {
      journeyId: journeyId,
    })
      // update progress in state 
      .then((journeyObj) => {
        // iterate over the list of journey objects and if I find one whos ID is 
        // the same as the one I just edited on the DB then update it 
        let indToRemove = null;
        for (let i = 0; i < this.state.journeys.length; i++) {
          if (this.state.journeys[i]._id === journeyObj._id) {
            indToRemove = i;
          }
        }
        let journeylist = [...this.state.journeys];
        journeylist.splice(indToRemove, 1);
        // ive updated all the journeys that need changing, now just update state and rerender
        this.setState({ journeys: journeylist });
      });
  };

  updateFeed = () => {
    get("/api/journey", {
      owner: this.props.userId,
      complete: this.props.completed
    })
      .then((journeyObjs) => {
        let reversedJourneyObjs = journeyObjs.reverse();
        reversedJourneyObjs.map((journeyObj) => {
          this.setState({ journeys: this.state.journeys.concat([journeyObj]) });
        });
      });
  }


  completeJourney = (journeyId, isCompletedCurrently) => {
    //  this needs to update the database and then go through the journey list and change the status
    console.log("JourneyCompleted")
    post("/api/completejourney", {
      journeyId: journeyId,
      complete: !isCompletedCurrently,
    })
      // update journey in state 
      .then(
        (journeyObj) => {
          // iterate over the list of journey objects and if I find one whos ID is 
          // the same as the one I just edited on the DB then update it 
          let indToRemove = null;
          let journeylist = [...this.state.journeys];
          for (let i = 0; i < this.state.journeys.length; i++) {
            if (this.state.journeys[i]._id === journeyObj._id) {
              journeylist[i].complete = journeyObj.complete;
              indToRemove = i;
            }
            journeylist.splice(indToRemove, 1);
          }
          // ive updated all the journeys that need changing, now just update state and rerender
          this.setState({ journeys: journeylist });

          this.props.toggleParty()
          this.updateFeed()
        }
      )
  }

  render() {
    let journeysList = null;
    let newJourney = null;
    let newJourneyPopup = null;
    const hasJourneys = this.state.journeys.length !== 0;
    if (hasJourneys) {
      journeysList = this.state.journeys.map((journeyObj) =>
      (<JourneyCard key={`Card_${journeyObj._id}${journeyObj.complete}`}
        owner={journeyObj.owner}
        journeyId={journeyObj._id}
        goal_name={journeyObj.goal_name}
        goal_frequency={journeyObj.goal_frequency}
        goal_time_unit={journeyObj.goal_time_unit}
        goal_unit={journeyObj.goal_unit}
        goal_quantity={journeyObj.goal_quantity}
        theme={journeyObj.theme}
        complete={journeyObj.complete}
        startDate={journeyObj.startDate}
        endDate={journeyObj.endDate}
        isMostRecent={(journeyObj._id === this.state.journeys[0]._id)}
        deleteJourney={this.deleteJourney}
        editJourney={this.editJourney}
        completeJourney={this.completeJourney}
      />));
    } else if (this.props.completed) {
      journeysList = <div className="JourneyFeed-needinput">No completed journeys! Start logging progress to complete them!</div>
    } else {
      journeysList = <div className="JourneyFeed-needinput">No current journeys! Start a new adventure today.</div>
    }
    if (!this.props.completed) {
      newJourney = <NewJourneyButton togglePopup={this.togglePopup} addNewJourney={this.addNewJourney} userId={this.props.userId} />
    }
    if (this.state.showPopup) { newJourneyPopup = <NewJourneyPopup closePopup={this.togglePopup.bind(this)} userId={this.state.userId} addNewJourney={this.addNewJourney} toggleParty={this.props.toggleParty} /> }
    return (

      <center>
        <div className="JourneyFeed-mainfeed">
          {newJourneyPopup}
          <div className="JourneyFeed-titlebar">
            {!this.props.completed ? <div className="JourneyFeed-maintitle"> &nbsp; &nbsp; Your Journeys &nbsp; &nbsp; </div>
              : <div className="Dashboard-title"> &nbsp; &nbsp; Your Completed Journeys &nbsp; &nbsp; </div>}
            {newJourney}
          </div>
          <div className="JourneyFeed-journeycontainer">
            {journeysList}
          </div>
        </div>
      </center>
    );
  }
};

export default JourneyFeed;