import React, { Component } from "react";
import "./NewJourneyPopup.css";
import {get, post} from "../../utilities";



/**
 * New Journey button.
 * Takes as props from Dashboard:
 * @userId : String
 * @addNewJourney : function
 */
class NewJourneyPopup extends Component {
  constructor(props) {
      super(props);
      this.state = {
        goal_name: "",
        goal_frequency: "",
        goal_time_unit: "Day",
        goal_quantity: "",
        theme: "",
        complete: false,
      }
  }
  
    addJourney = () => {
        const body = { //this might be a little jank? may want to refactor this later I just didn't want to break anything
            goal_name: this.state.goal_name,
            goal_frequency: this.state.goal_frequency,
            goal_time_unit: this.state.goal_time_unit,
            goal_unit: this.state.goal_unit,
            goal_quantity: this.state.goal_quantity,
            theme: "Classic",
            complete: false,
        };
        post("/api/journey", body).then((journey) => {
          // display this story on the screen
          this.props.addNewJourney(journey);
        });
      };

      change = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      onSubmit = (e) => {
        if (this.state.goal_name === "" | this.state.goal_frequency === "" | this.state.goal_quantity === "") {
            alert("We need to know exactly what your goal is, please fill out all fields. Thanks!")
        } else {
            this.addJourney();
            this.props.closePopup();
        }
        // e.preventDefault();  this doesnt seem to be working so I just did if else statement
        //console.log(this.state);
      }

    render() {   
        return (
        <div className="NewJourneyPopup-popup">
            <div className='NewJourneyPopup-popupinner'> 
            <div className='NewJourneyPopup-content'>
            <form>
              I want to 
              <input 
              type="text"
              name="goal_name"
              placeholder="Reading" 
              onChange={e => this.change(e)} 
              />
              <br />
              {/* Goal details:  */}
              <input 
              type="number" 
              name="goal_quantity" 
              placeholder="30" 
              onChange={e => this.change(e)}
              /> 
              <input 
              type="text" 
              name="goal_unit" 
              placeholder="pages"
              onChange={e => this.change(e)}
              />
              <br />
              {/* Frequency:  */}
              <input 
              type="number" 
              name="goal_frequency" 
              placeholder="1"
              onChange={e => this.change(e)}
              /> times per
              <select name="goal_time_unit" onChange={e => this.change(e)}> 
                <option value="Day">day</option>
                <option value="Week">week</option>
                <option value="Month">month</option>
              </select>
              <br />
              <div className = "NewJourneyPopup-buttonContainer">
                <div className="NewJourneyPopup-button2" onClick={this.props.closePopup}>&nbsp; Cancel &nbsp;</div>
                <div className="NewJourneyPopup-button" onClick={e => this.onSubmit(e)}>&nbsp; Submit &nbsp;</div>
              </div>
            </form>
            </div>
            </div>
          </div>

        );
  }
};

export default NewJourneyPopup;