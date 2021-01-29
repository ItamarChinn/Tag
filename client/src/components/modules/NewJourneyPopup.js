import React, { Component } from "react";
import "./NewJourneyPopup.css";
import { get, post } from "../../utilities";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


/**
 * NewJourneyPopup is a component that renders as a popup over the dashboard that takes the user input
 * on the Journey details, posts them to the database through the API and then disappears
 * Takes as props from JourneyFeed.js:
 * @closePopup : function,
 * @userId : String,
 * @addNewJourney : function,
 * @toggleParty : function,
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

  // adds a new Journey object to the DB
  addJourney = () => {
    const body = {
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

  // used to set the state from any user input
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // checks that the form was filled correctly and if so triggers addJourney and confetti and also removes popup
  onSubmit = (e) => {
    if (this.state.goal_name === "" | this.state.goal_frequency === "" | this.state.goal_quantity === "") {
      alert("We need to know exactly what your goal is, please fill out all fields. Thanks!")
    } else {
      this.addJourney();
      this.props.toggleParty();
      this.props.closePopup();
    }
  }

  // https://www.npmjs.com/package/react-datepicker DOCS ON DATEPICKER
  // used with react-datepicker to set dates
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




  render() {
    return (
      <div className="NewJourneyPopup-popup">
        <div className='NewJourneyPopup-popupinner'>
          <div className='NewJourneyPopup-content'>
            <center style={{ "fontSize": "32px" }}>You are about to embark on a journey! </center>
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
                <div className="NewJourneyPopup-buttonContainer">
                  <div className="NewJourneyPopup-button2" onClick={this.props.closePopup}>&nbsp; Cancel &nbsp;</div>
                  <div className="NewJourneyPopup-button" onClick={e => this.onSubmit(e)}>&nbsp; Submit &nbsp;</div>
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