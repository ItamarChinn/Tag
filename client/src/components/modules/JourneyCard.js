﻿import React, { Component } from "react";
import { get, post } from "../../utilities";
import "./JourneyCard.css";
import "../App.js";
import NewProgressButton from "../modules/NewProgressButton.js"
import SingleProgress from "../modules/SingleProgress.js"
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import JourneyDiagram from "../modules/JourneyDiagram.js";
import Reward from 'react-rewards';
import { MdDelete, MdClose, MdDone, MdModeEdit } from 'react-icons/md';
import ConfirmDeleteJourney from "../modules/ConfirmDeleteJourney.js";


class JourneyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journeyId: null,
      goal_name: null,
      goal_frequency: null,
      goal_time_unit: null,
      goal_unit: null,
      goal_quantity: null,
      theme: null,
      complete: null,
      startDate: null,
      endDate: null,
      progresses: [],
      totalProgress: 0,
      showProgress: true,
      showDeletePopup: false,
      editingMode: false,
    }
  }


  componentDidMount() {
    get("/api/progress", {
      journeyId: this.props.journeyId
    })
      .then((progressObjs) => {
        let reversedProgressObjs = progressObjs.reverse();
        reversedProgressObjs.map((progressObj) => {
          this.setState({
            progresses: this.state.progresses.concat([progressObj]),
            totalProgress: this.state.totalProgress + progressObj.progress_quantity,
          });
        });
        this.setState({
          journeyId: this.props.journeyId,
          goal_name: this.props.goal_name,
          goal_frequency: this.props.goal_frequency,
          goal_time_unit: this.props.goal_time_unit,
          goal_unit: this.props.goal_unit,
          goal_quantity: this.props.goal_quantity,
          theme: this.props.theme,
          complete: this.props.complete,
          startDate: this.props.startDate,
          endDate: this.props.endDate,
          showProgress: this.props.isMostRecent
        })
      });
  }

  getWeekNumber = (d) => {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
  }


  // PROGRESS EDITING

  onIncrement = (progressObject) => {
    // update progress on mongodb
    post("/api/editprogress", {
      progressId: progressObject.progressId,
      updatedProgress: progressObject.progress_quantity,
      editingMode: false,
      datetime: progressObject.datetime,
      comment: progressObject.comment,
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
          } else { newTotalProgress += proglist[i].progress_quantity }
        }
        // ive updated all the progresses that need changing, now just update state and rerender
        this.setState({ progresses: proglist, totalProgress: newTotalProgress });
      });
  }

  addNewProgress = () => {
    const body = {
      journeyId: this.props.journeyId,
      progress_quantity: 0,
      goal_unit: this.props.goal_unit,
      datetime: new Date(),
      editingMode: true,
      comment: this.messagePicker(),
    };
    post("/api/progress", body).then((progressObj) => {
      this.setState({
        progresses: [progressObj].concat(this.state.progresses),
        totalProgress: this.state.totalProgress + progressObj.progress_quantity,
        datetime: progressObj.datetime
      })
      // this.reward.rewardMe();
      // this.reward.punishMe();
    });
  };


  deleteProgress = (progressId) => {
    // update progress on mongodb
    post("/api/deleteprogress", {
      progressId: progressId,
    })
      // update progress in state 
      .then((progress) => {
        // iterate over the list of progress objects and if I find one whos ID is 
        // the same as the one I just edited on the DB then update it 
        let newTotalProgress = this.state.totalProgress;
        let indToRemove = null;
        for (let i = 0; i < this.state.progresses.length; i++) {
          if (this.state.progresses[i]._id === progress._id) {
            indToRemove = i;
            newTotalProgress -= this.state.progresses[i].progress_quantity;
          }
        }
        let proglist = [...this.state.progresses];
        proglist.splice(indToRemove, 1);
        // ive updated all the progresses that need changing, now just update state and rerender
        this.setState({ progresses: proglist, totalProgress: newTotalProgress });
      });
  }

  // UI TOGGLING & STYLING

  toggleToggle = () => {
    this.setState({ showProgress: !this.state.showProgress })
  }


  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  lowercaseFirstLetter = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  // Edit or Delete Journey
  toggleEditing = () => {
    if (this.state.editingMode) {
      this.setState({ editingMode: !this.state.editingMode });
      const updatedJourneyObject = {
        journeyId: this.state.journeyId,
        goal_name: this.state.goal_name,
        goal_frequency: this.state.goal_frequency,
        goal_time_unit: this.state.goal_time_unit,
        goal_unit: this.state.goal_unit,
        goal_quantity: this.state.goal_quantity,
        theme: this.state.theme,
        complete: this.state.complete,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      }
      this.props.editJourney(updatedJourneyObject)
    } else {
      this.setState({ editingMode: !this.state.editingMode });
    }
  }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleDelete = () => {
    this.setState({ showDeletePopup: !this.state.showDeletePopup })
  }

  toggleEditingMode = () => {
    this.setState({ editingMode: !this.state.editingMode });
  }


  // Comment handling
  messagePicker = () => {
    let message = "";
    let positiveList = [
      "Good Job!",
      "Nice Going!",
      "Great Work!",
      "Keep it Up!"
    ]

    let negativeList = [
      "Almost there!",
      "Keep pushing!",
      "Great Effort!",
      "Every bit counts!"
    ]

    if (this.props.progressDifference <= 0) {
      return message = positiveList[Math.floor(Math.random() * positiveList.length)];
    } else {
      return message = negativeList[Math.floor(Math.random() * negativeList.length)];
    }
  }


  render() {
    let progressList = null;
    let newProgressButton = null;
    let noprogress = null;
    const hasProgress = this.state.progresses.length !== 0;

    if (hasProgress) {
      noprogress = null;
      progressList = this.state.progresses.map((progressObj) =>
      (<SingleProgress key={`Card_${progressObj._id}`}
        journeyId={progressObj.journeyId}
        progressId={progressObj._id}
        progress_quantity={progressObj.progress_quantity}
        goal_unit={progressObj.goal_unit}
        datetime={progressObj.datetime}
        onIncrement={this.onIncrement}
        deleteProgress={this.deleteProgress}
        newInputedProgress={progressObj.editingMode}
        comment={progressObj.comment}
      // newInputedProgress={progressObj._id === this.state.progresses[0]._id}
      // progressDifference={this.calculateDifference()}
      />));
    } else {
      progressList = null;
      noprogress = <div className="JourneyCard-noprogress">Hit <NewProgressButton
        addNewProgress={this.addNewProgress}
        userId={this.props.userId}
        journeyId={this.props.journeyId}
        goal_unit={this.props.goal_unit}
        addNewProgress={this.addNewProgress} /> to start logging your progress</div>
    }
    if (!this.props.completed) {
      newProgressButton = <NewProgressButton
        addNewProgress={this.addNewProgress}
        userId={this.props.userId}
        journeyId={this.props.journeyId}
        goal_unit={this.props.goal_unit}
        addNewProgress={this.addNewProgress} />
    }

    // Date parsing
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const start_date = new Date(this.props.startDate);
    const end_date = new Date(this.props.endDate);

    const current_date = new Date();
    const date = String(current_date.getDate());
    const week_number = String(this.getWeekNumber(current_date))
    const month = String(current_date.getMonth());
    const year = String(current_date.getFullYear());
    let filtered_progress = null;

    // ADDING PERIODIC PROGRESS
    if (this.props.goal_time_unit == "Day") {
      filtered_progress = this.state.progresses.filter((progressObj) => {
        const date_of_progress = String(new Date(progressObj.datetime).getDate())
        const month_of_progress = String(new Date(progressObj.datetime).getMonth())
        const year_of_progress = String(new Date(progressObj.datetime).getFullYear())
        return (date === date_of_progress && month === month_of_progress && year === year_of_progress)
        // console.log(filtered_progress);
      });
    } else if (this.props.goal_time_unit == "Week") {
      filtered_progress = this.state.progresses.filter((progressObj) => {
        console.log(week_number)
        console.log(this.getWeekNumber(new Date(progressObj.datetime)))
        const year_of_progress = String(new Date(progressObj.datetime).getFullYear())
        const week_of_progress = String(this.getWeekNumber(new Date(progressObj.datetime)))
        return (week_number === week_of_progress && year === year_of_progress)
        // console.log(filtered_progress);
      })
    } else if (this.props.goal_time_unit == "Month") {
      filtered_progress = this.state.progresses.filter((progressObj) => {
        const month_of_progress = String(new Date(progressObj.datetime).getMonth());
        const year_of_progress = String(new Date(progressObj.datetime).getFullYear());

        return (month === month_of_progress && year === year_of_progress)
        // console.log(filtered_progress);
      })
    }

    let actualPeriodicProgress = 0;
    for (let i = 0; i < filtered_progress.length; i++) {
      actualPeriodicProgress += filtered_progress[i].progress_quantity;
    }


    let goalName = null;
    let goalQuantity = null;
    let goalUnit = null;
    let goalFrequency = null;
    let goalTimeUnit = null;

    if (this.state.editingMode) {
      goalName = (<input className="JourneyCard-titleinput"
        type="text"
        name="goal_name"
        placeholder={this.capitalizeFirstLetter(String(this.state.goal_name))}
        onChange={e => this.change(e)} />);
      goalQuantity = (
        <input className="JourneyCard-goalquantityinput"
          type="number"
          name="goal_quantity"
          placeholder={this.state.goal_quantity}
          onChange={e => this.change(e)}
        />);
      goalUnit = (<input className="JourneyCard-goalunitinput"
        type="text"
        name="goal_unit"
        placeholder={this.state.goal_unit}
        onChange={e => this.change(e)}
      />);
      goalFrequency = (
        <input className="JourneyCard-goalfrequencyinput"
          type="number"
          name="goal_frequency"
          placeholder={this.state.goal_frequency}
          onChange={e => this.change(e)}
        />
      );
      goalTimeUnit = (<select className="JourneyCard-goaltimeunitinput" name="goal_time_unit" onChange={e => this.change(e)} value={this.capitalizeFirstLetter(String(this.state.goal_time_unit))}>
        <option value="Day">day</option>
        <option value="Week">week</option>
        <option value="Month">month</option>
      </select>);
    } else {
      goalName = this.capitalizeFirstLetter(String(this.state.goal_name));
      goalQuantity = this.state.goal_quantity;
      goalUnit = this.state.goal_unit
      goalFrequency = this.state.goal_frequency;
      goalTimeUnit = this.lowercaseFirstLetter(String(this.state.goal_time_unit));
    }


    return (
      <>
        {this.state.showDeletePopup ?
          <ConfirmDeleteJourney
            journeyId={this.props.journeyId}
            deleteJourney={this.props.deleteJourney}
            closePopup={this.toggleDelete} /> : null}
        <div className="JourneyCard-container" >
          <div className="JourneyCard-journey">

            <div className="JourneyCard-subcontainer">
              <div className="JourneyCard-title">
                {goalName}
              </div>
              <div className="JourneyCard-subcontainer2">
                <div className="JourneyCard-title">
                  {goalQuantity} {goalUnit}, {goalFrequency} times per {goalTimeUnit}
                </div>
              </div>
            </div>
            <div className="JourneyCard-subcontainer">

              {(this.state.goal_frequency * this.state.goal_quantity - this.state.totalProgress >= 0) &&
                <div className="JourneyCard-item">
                  <div className="JourneyCard-subtitle">
                    Only {this.state.goal_frequency * this.state.goal_quantity - this.state.totalProgress} {this.state.goal_unit} left this {this.lowercaseFirstLetter(String(this.state.goal_time_unit))}!
                    </div>
                  <div className="JourneyCard-editbuttoncontainer">
                    {!this.state.editingMode ?
                      <>
                        <div className="JourneyCard-editbutton" onClick={this.toggleDelete}><MdDelete /></div>
                        <div className="JourneyCard-editbutton" onClick={this.toggleEditing}><MdModeEdit /></div>
                      </>
                      : <>
                        <div className="JourneyCard-editbutton" onClick={this.toggleEditingMode}><MdClose /></div>
                        <div className="JourneyCard-editbutton" onClick={this.toggleEditing}><MdDone /></div>
                      </>}

                  </div>
                </div>}

              {(this.state.goal_frequency * this.state.goal_quantity - this.state.totalProgress < 0) &&
                <div className="JourneyCard-item">
                  <div className="JourneyCard-subtitle">
                    Nice job! You're {Math.abs(this.state.goal_frequency * this.state.goal_quantity - this.state.totalProgress)} {this.state.goal_unit} over your goal this {this.lowercaseFirstLetter(String(this.state.goal_time_unit))}!
                  </div>
                  <div className="JourneyCard-editbuttoncontainer">
                    {!this.state.editingMode ?
                      <>
                        <div className="JourneyCard-editbutton" onClick={this.toggleDelete}><MdDelete /></div>
                        <div className="JourneyCard-editbutton" onClick={this.toggleEditing}><MdModeEdit /></div>
                      </>
                      :
                      <>
                        <div className="JourneyCard-editbutton" onClick={this.toggleEditingMode}><MdClose /></div>
                        <div className="JourneyCard-editbutton" onClick={this.toggleEditing}><MdDone /></div>
                      </>}
                  </div>
                </div>
              }
            </div>

            <JourneyDiagram
              totalProgress={this.state.totalProgress}
              startDate={start_date}
              endDate={end_date}
              theme={this.props.theme}
              goal_time_unit={this.props.goal_time_unit}
              goal_unit={this.props.goal_unit}
              goal_quantity={this.props.goal_quantity}
              goal_frequency={this.props.goal_frequency}
              actualProgress={actualPeriodicProgress}
            />
            <div className="JourneyCard-subcontainer">
              <div className="JourneyCard-subtitle"> Start {start_date.getDate()} {monthNames[start_date.getMonth()]} {start_date.getFullYear()} </div>
              <div className="JourneyCard-subtitle"> Finish {end_date.getDate()} {monthNames[end_date.getMonth()]} {end_date.getFullYear()} </div>
            </div>
          </div>
          <div className="JourneyCard-progresstoggler">
            <div className="JourneyCard-subcontainer">
              {this.state.showProgress ? <div className="JourneyCard-togglebutton" onClick={this.toggleToggle}><MdExpandLess /></div> : <div className="JourneyCard-togglebutton" onClick={this.toggleToggle}><MdExpandMore /></div>}
              {newProgressButton}
            </div>

            {this.state.showProgress && <div className="JourneyCard-progresslist">
              <div className="JourneyCard-subcontainerprogress">
                <div className="JourneyCard-subtitle_left"> {this.capitalizeFirstLetter(this.props.goal_unit)} </div>
                <div className="JourneyCard-subtitle_center"> Time </div>
                <div className="JourneyCard-subtitle_center"> Comments </div>
                <div className="JourneyCard-subtitle_right"> Edit </div>
                {/* <hr className="here" /> */}
                {progressList}
              </div>
            </div>}
            {this.state.showProgress && noprogress}
          </div>
          <br />
        </div>
      </>
    );
  }
};

export default JourneyCard;