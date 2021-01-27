import React, { Component } from "react";
import "./JourneyDiagram.css";
import "../../public/night_sky.jpg";
import CompletedJourneyButton from "../modules/CompletedJourneyButton.js";

/**
 * Journey Diagram showing your journey
 */
class JourneyDiagram extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let start = null;
    let character = null;
    let chaser = null;
    let stationOne = null;
    let stationTwo = null;
    let stationThree = null;
    let end = null;
    let backgroundTheme = null;
    let completionPicture = null;

    if (this.props.theme == "space") {
      start = "🌎";
      character = "🚀";
      chaser = "🛸";
      stationOne = "☄️";
      stationTwo = "🌌";
      stationThree = "🪐";
      end = "☀️";
      backgroundTheme = "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,104,172,1) 100%, rgba(0,212,255,1) 100%)";
      completionPicture = "JOURNEY COMPLETED! GREAT JOB CHASING YOUR DREAMS!";
    } else if (this.props.theme == "forest") {
      start = "🏡";
      character = "🤸";
      chaser = "🐯";
      stationOne = "🐘";
      stationTwo = "🌲";
      stationThree = "🐒";
      end = "⛺";
      backgroundTheme = "linear-gradient(90deg, rgba(112,177,53,1) 0%, rgba(49,82,3,1) 100%, rgba(0,212,255,1) 100%)";
      completionPicture = "JOURNEY COMPLETED! GREAT JOB CHASING YOUR DREAMS!";
    } else if (this.props.theme == "ocean") {
      start = "🏖️";
      character = "⛵";
      chaser = "🦈";
      stationOne = "🐙";
      stationTwo = "🐬";
      stationThree = "🐚";
      end = "🏝️";
      backgroundTheme = "linear-gradient(90deg, rgba(0,80,223,1) 0%, rgba(42,135,123,1) 100%, rgba(0,212,255,1) 100%)";
      completionPicture = "JOURNEY COMPLETED! GREAT JOB CHASING YOUR DREAMS!";
    };


    let actualFractionComplete = this.props.actualProgress / (this.props.goal_quantity * this.props.goal_frequency);
    if (actualFractionComplete > 1) {
      actualFractionComplete = 1;
    }

    let expectedFractionComplete = null;
    const current_date = new Date();
    const date = String(current_date.getDate());
    const day = String(current_date.getDay());
    const hour = String(current_date.getHours());

    if (this.props.goal_time_unit === "Day") {
      expectedFractionComplete = hour / 24;
    } else if (this.props.goal_time_unit === "Week") {
      expectedFractionComplete = day / 7;
      console.log(this.props.actualProgress)
      console.log(this.props.goal_quantity)
      console.log(this.props.goal_frequency)
      console.log(actualFractionComplete);
    } else if (this.props.goal_time_unit === "Month") {
      expectedFractionComplete = date / 31;
    }


    const bgStyle = {
      background: backgroundTheme,
    }


    const lineProgressStyle = {
      width: String(100 * actualFractionComplete) + "%",
    }

    const lineChaserStyle = {
      width: String(100 * expectedFractionComplete) + "%",
    }

    const characterProgressStyle = {
      width: String(100 * actualFractionComplete + 2) + "%",
    }

    const chaserProgressStyle = {
      width: String(100 * expectedFractionComplete) + "%"
    }

    let tag_message = String("Great work staying on top of your goals!");
    if (expectedFractionComplete - actualFractionComplete > 0) {
      tag_message = String("Oh no! Keep up and don't get tagged.");
    }
    else if (actualFractionComplete == 1) {
      tag_message = String("Congrats! You're chasing your dreams :)")
    }


    return (
      <div className="JourneyDiagram-box" style={bgStyle}>
        {(this.props.completed) ?
          <div className="JourneyDiagram-progresstext" style={{ display: "flex", alignSelf: "center", justifySelf: "center", textAlign: "center" }}> {completionPicture} </div>
          :
          <>
            <div className="JourneyDiagram-line">
              <div className="JourneyDiagram-boxbox" style={lineProgressStyle}>
                <hr className="progressAvatar" />
              </div>
            </div>
            <div className="JourneyDiagram-line">
              <div className="JourneyDiagram-boxbox" style={lineChaserStyle}>
                <hr className="progressChaser" />
              </div>
            </div>
            <div className="JourneyDiagram-stations" >
              <div className="JourneyDiagram-center">{start}</div>
              <div className="JourneyDiagram-top">
                <div>
                  <div className="JourneyDiagram-progresstext"> You're on your way :) </div>
                  {stationOne}
                </div>
              </div>
              <div className="JourneyDiagram-bottom">
                <div>
                  <div>{stationTwo}
                    <div className="JourneyDiagram-progresstext"> Halfway </div>
                  </div>
                </div>
              </div>
              <div className="JourneyDiagram-top">
                <div className="JourneyDiagram-progresstext"> Almost there! </div>
                {stationThree}
              </div>
              <div className="JourneyDiagram-center">
                {end}
              </div>
              <div className="JourneyDiagram-tagmessage"> {tag_message} </div>
            </div>
            <div className="JourneyDiagram-progresscharacters" >
              <div className="JourneyDiagram-character" style={characterProgressStyle}>{character}</div>
              <div className="JourneyDiagram-chaser" style={chaserProgressStyle}>{chaser}</div>
            </div></>}
        <div className="JourneyDiagram-completejourney">
          <CompletedJourneyButton
            togglePopup={this.props.togglePopup}
            completed={this.props.completed}
          /></div>
      </div>
    );
  }
};

export default JourneyDiagram;