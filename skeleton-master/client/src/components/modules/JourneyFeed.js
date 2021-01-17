import React, { Component } from "react";
import "./JourneyFeed.css";
import {get, post} from "../../utilities";
import JourneyCard from "./JourneyCard.js"
import NewJourney from "./NewJourney.js";
 
/**
 * What is this>
 */
class JourneyFeed extends Component {
  constructor(props) {
    super(props);{
      this.state = {
        journeys: [],
      }
    }
  }

  // this gets called when the user pushes "Submit" to add a new journey, so their
  // journey gets added to the screen right away
  addNewJourney = (journeyObj) => {
    this.setState({
      journeys: [journeyObj].concat(this.state.journeys),
    });
  };

  componentDidMount () {
    get("/api/journey", { owner: this.props.userId, complete: this.props.completed })
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
    const hasJourneys = this.state.journeys.length !== 0;
    if (hasJourneys & !this.props.completed) {    // like :)
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
          complete={journeyObj.complete} />));
    } else if (this.props.completed) {
      journeysList = <div>No completed journeys! Start logging progress to complete them!</div>
    } else {
      journeysList = <div>No current journeys! Start a new adventure today.</div>
    }
    if (!this.props.completed) {
      newJourney = <NewJourney addNewJourney={this.addNewJourney} userId={this.props.userId}/>
      }

    return ( 
    <>
    {newJourney}
    {journeysList}
    </>
    );
  }
};

export default JourneyFeed;