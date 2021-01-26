import React, { Component } from "react";
import { get, post } from "../../utilities";
import "./JourneyCard.css";
import "../App.js";
import NewProgressButton from "../modules/NewProgressButton.js"
import SingleProgress from "../modules/SingleProgress.js"
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import JourneyDiagram from "../modules/JourneyDiagram.js";
import Reward from 'react-rewards';

class JourneyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progresses: [],
      totalProgress: 0,
      // current_progress: 0,
      showProgress: true,
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
        this.setState({ showProgress: this.props.isMostRecent })
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


  // PROGRESS INCREMENTING
  onIncrement = (progressObject) => {
    // update progress on mongodb
    post("/api/editprogress", {
      progressId: progressObject.progressId,
      updatedProgress: progressObject.progress_quantity,
      editingMode: false,
      datetitme: progressObject.datetime,
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
    console.log("Now:");
    console.log(body.datetime)
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
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const start_date = new Date(this.props.startDate);
    const end_date = new Date(this.props.endDate);

    const current_date = new Date();
    const date = String(current_date.getDate());
    const week_number = String(this.getWeekNumber(current_date))
    const month = String(current_date.getMonth());
    const year = String(current_date.getFullYear());
    let filtered_progress = null;


    if (this.props.goal_time_unit == "Day") {
      filtered_progress = this.state.progresses.filter((progressObj) => {
        const date_of_progress = String(new Date(progressObj.datetime).getDate())
        const month_of_progress = String(new Date(progressObj.datetime).getMonth())
        const year_of_progress = String(new Date(progressObj.datetime).getFullYear())
        return (date === date_of_progress && month === month_of_progress && year === year_of_progress)
      });
    } else if (this.props.goal_time_unit == "Week") {
      filtered_progress = this.state.progresses.filter((progressObj) => {

        return (week_number === this.getWeekNumber(new Date(progressObj.datetime)))
      })
    } else if (this.props.goal_time_unit == "Month") {
      filtered_progress = this.state.progresses.filter((progressObj) => {
        const month_of_progress = String(new Date(progressObj.datetime).getMonth());
        const year_of_progress = String(new Date(progressObj.datetime).getFullYear());
        return (month === month_of_progress && year === year_of_progress)
      })
    }

    let actualPeriodicProgress = 0;
    for (let i = 0; i < filtered_progress.length; i++) {
      actualPeriodicProgress += filtered_progress[i].progress_quantity;
    }


    return (
      <div className="JourneyCard-container" >
        <div className="JourneyCard-journey">

          <div className="JourneyCard-subcontainer">
            <div className="JourneyCard-title">
              {this.capitalizeFirstLetter(this.props.goal_name)}
            </div>
            <div className="JourneyCard-subcontainer2">
              <div className="JourneyCard-title">
                {this.props.goal_quantity} {this.props.goal_unit}, {this.props.goal_frequency} times per {this.lowercaseFirstLetter(this.props.goal_time_unit)}
              </div>
            </div>
          </div>
          <div className="JourneyCard-subcontainer">

            {(this.props.goal_frequency * this.props.goal_quantity - this.state.totalProgress >= 0) &&
              <div className="JourneyCard-subtitle">
                Only {this.props.goal_frequency * this.props.goal_quantity - this.state.totalProgress} {this.props.goal_unit} left this {this.lowercaseFirstLetter(this.props.goal_time_unit)}!</div>}

            {(this.props.goal_frequency * this.props.goal_quantity - this.state.totalProgress < 0) && <div className="JourneyCard-subtitle">
              Nice job! You're {Math.abs(this.props.goal_frequency * this.props.goal_quantity - this.state.totalProgress)} {this.props.goal_unit} over your goal this {this.lowercaseFirstLetter(this.props.goal_time_unit)}!
          </div>}
          </div>

          <JourneyDiagram
            totalProgress={this.state.totalProgress}
            startDate={start_date}
            endDate={end_date}
            theme={this.props.theme}
            goal_unit={this.props.goal_time_unit}
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
    );
  }
};

export default JourneyCard;