import React, { Component } from "react";
import "./JourneyFeed.css";
import {get, post} from "../../utilities";
import JourneyCard from "../modules/JourneyCard.js"
import NewJourneyButton from "../modules/NewJourneyButton.js";
import NewJourneyPopup from "../modules/NewJourneyPopup.js"
 
/**
 * What is this>
 */
class JourneyFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journeys: [],
      showPopup: false,
    }
  }
  
  togglePopup = () =>  {  
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

  componentDidMount () {
    get("/api/journey", { 
      owner: this.props.userId, 
      complete: this.props.completed 
    })
    .then((journeyObjs) => { //confirm w itamar about backend, but this is from the catbook  
      let reversedJourneyObjs = journeyObjs.reverse();
      reversedJourneyObjs.map((journeyObj) => {
        this.setState({ journeys: this.state.journeys.concat([journeyObj]) });
      });
    });
  }

  render() {
    let journeysList = null; //going to hold all of our JourneyCard components
    let newJourney = null;
    let newJourneyPopup = null;
    const hasJourneys = this.state.journeys.length !== 0;
    if (hasJourneys) {    // like :)
      journeysList = this.state.journeys.map((journeyObj) => //WILL HAVE TO CHANGE THIS IF THE PARAMETERS OF JOURNEY CARD CHANGE
          (<JourneyCard key={`Card_${journeyObj._id}`} 
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
          endDate={journeyObj.endDate}/>));
    } else if (this.props.completed) {
      journeysList = <div>No completed journeys! Start logging progress to complete them!</div>
    } else {
      journeysList = <div>No current journeys! Start a new adventure today.</div>
    }
    if (!this.props.completed) {
      newJourney = <NewJourneyButton togglePopup={this.togglePopup} addNewJourney={this.addNewJourney} userId={this.props.userId}/>
      }
    if (this.state.showPopup) {newJourneyPopup = <NewJourneyPopup closePopup={this.togglePopup.bind(this)} userId={this.state.userId} addNewJourney={this.addNewJourney}/>}
    return ( 
      
    <>
    {newJourneyPopup}
    <div className="JourneyFeed-mainfeed">
      {newJourney}
      <div className="JourneyFeed-journeycontainer">
      {journeysList}
      </div>
    </div>
   </> 
    );
  }
};

export default JourneyFeed;