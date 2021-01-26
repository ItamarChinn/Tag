import React, { Component } from "react";
import "./NewJourneyPopup.css";
import {get, post} from "../../utilities";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
        theme: "space",
        complete: false,
        startDate: new Date(),
        endDate: new Date(),
      }
  }
  
    addJourney = () => {
        const body = { //this might be a little jank? may want to refactor this later I just didn't want to break anything
            goal_name: this.state.goal_name,
            goal_frequency: this.state.goal_frequency,
            goal_time_unit: this.state.goal_time_unit,
            goal_unit: this.state.goal_unit,
            goal_quantity: this.state.goal_quantity,
            theme: this.state.theme,
            complete: false,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
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
            this.props.toggleParty();
            this.props.closePopup();
        }
        // e.preventDefault();  this doesnt seem to be working so I just did if else statement
        //console.log(this.state);
      }

      setStartDate = (date) => {
        this.setState({ 
          startDate: new Date(date)
        })
      }

      setEndDate = (date) => {
        this.setState({ 
          endDate: new Date(date)
        })
      }


      // https://www.npmjs.com/package/react-datepicker DOCS ON DATEPICKER


    render() {   
      
        return (
        <div className="NewJourneyPopup-popup">
            <div className='NewJourneyPopup-popupinner'> 
            <div className='NewJourneyPopup-content'>
            <center style={{"fontSize": "32px"}}>You are about to embark on a journey! </center>
            <center>Start your journey on <DatePicker
                selected={this.state.startDate}
                onChange={date => this.setStartDate(date)}
                popperModifiers={{
                  computeStyle: { gpuAcceleration: false }
              }}
                showYearDropdown
                />
                <br />
            and end it on <DatePicker
                selected={this.state.endDate}
                onChange={date => this.setEndDate(date)}
                popperModifiers={{
                  computeStyle: { gpuAcceleration: false }
              }}
                showYearDropdown
                />
                <br />
            <form>
              I want to 
              <input 
              type="text"
              name="goal_name"
              placeholder="Read" 
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
              I want to journey through
              <select name="theme" onChange={e => this.change(e)}> 
                <option value="space">space</option>
                <option value="forest">a forest</option>
                <option value="ocean">the ocean</option>
              </select>
              <div className = "NewJourneyPopup-buttonContainer">
                <div className="NewJourneyPopup-button2" onClick={this.props.closePopup}>&nbsp; Cancel &nbsp;</div>
                {/* <Reward
                  ref={(ref) =>{this.reward = ref;}}
                  type='confetti'
                  > */}
                <div className="NewJourneyPopup-button" onClick={e => this.onSubmit(e)}>&nbsp; Submit &nbsp;</div>
                {/* </Reward> */}
              </div>
            </form>
            </center>
            </div>
            </div>
          </div>

        );
  }
};

export default NewJourneyPopup;