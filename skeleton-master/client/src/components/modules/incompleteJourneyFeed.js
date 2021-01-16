import React, { Component } from "react";
import "./IncompleteJourneyFeed.css";
import {get} from "../../utilities";
import JourneyCard from "./JourneyCard.js"
 
/**
 * What is this>
 */
class IncompleteJourneyFeed extends Component {
  constructor(props) {
    super(props);{
      this.state = {
        journeys: [],
      }
    }

  }

  componentDidMount () {
    get("/api/stories").then((journeyObjs) => { //confirm w itamar about backend, but this is from the catbook  
      this.setState({
        journeys: journeyObjs
      })
    })
  }

  render() {
    let journeysList = null; //going to hold all of our JourneyCard components
    if (this.state.journeys.length !== 0)
    {
      journeysList = this.state.journeys.map(journeyObj => //WILL HAVE TO CHANGE THIS IF THE PARAMETERS OF JOURNEY CARD CHANGE
        <JourneyCard owner={journeyObj.owner} 
        journeyId={journeyObj.journeyId}
        goal_name={journeyObj.goal_name}
        goal_frequency={journeyObj.goal_frequency}
        time_unit={journeyObj.time_unit}
        goal_unit={journeyObj.goal_unit}
        goal_quantity={journeyObj.goal_quantity}
        theme={journeyObj.theme} />
        )
    } else {
      journeysList = <div>No current journeys! Start a new adventure today.</div>
    }

    return ( <div>{journeysList}</div>
    );
  }
};

export default IncompleteJourneyFeed;