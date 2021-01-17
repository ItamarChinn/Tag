import React, { Component } from "react";
import "./IncompleteJourneyFeed.css";
import {get, post} from "../../utilities";
import JourneyCard from "./JourneyCard.js"
import NewJourney from "./NewJourney.js";
 
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

  // this gets called when the user pushes "Submit" to add a new journey, so their
  // journey gets added to the screen right away
  addNewJourney = (journeyObj) => {
    this.setState({
      journeys: [journeyObj].concat(this.state.journeys),
    });
  };

  componentDidMount () {
    get("/api/journey", { owner: this.props.userId, complete: false }).then((journeyObj) => { //confirm w itamar about backend, but this is from the catbook  
      if (journeyObj.owner === this.props.userId) {
        this.setState({
          journeys: [journeyObj].concat(this.state.journeys)
        })
      }
    })
  };

  render() {
    let journeysList = null; //going to hold all of our JourneyCard components
    const hasJourneys = this.state.journeys.length !== 0;
    if (hasJourneys) // like :)
    {
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
        complete={journeyObj.complete} />)
        )
    
    } else {
      journeysList = <div>No current journeys! Start a new adventure today.</div>
    }

    return ( 
    <>
    <NewJourney addNewJourney={this.addNewJourney} userId={this.props.userId}/>
    {journeysList}
    </>
    );
  }
};

export default IncompleteJourneyFeed;