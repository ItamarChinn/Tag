import React, { Component } from "react";
import "./NewProgressButton.css";
import Reward from 'react-rewards';


/**
 * This is the button that will record new progress in a specific journey
 */
class NewProgressButton extends Component {
  constructor(props) {
    super(props);
  }

  clicked = () => {
    this.props.addNewProgress();
    this.reward.rewardMe()
  }

  render() {
    let emoji_array = null;
    if (this.props.theme === "space") {
      emoji_array = [ "🌎", "🚀","🛸","🌔","🪐","☄️","🌌", "☀️"];
    } else if (this.props.theme === "forest") {
      emoji_array = [ "🏡", "🤸","🐯","🐘","🌲","🐒","⛺"];
    } else if (this.props.theme === "ocean") {
      emoji_array = [ "🏖️", "⛵","🦈","🐙","🐬","🐚","🏝️"];
    }


    return (
      // <div className="NewProgressButton-centering">
      <center className="NewProgressButton-centering">
      <Reward
        ref={(ref) => this.reward = ref}
        type='emoji'
        config={{
          lifetime: 200,
          spread: 200,
          emoji: emoji_array,
        }}
      > 
        <div className="NewProgressButton-button" onClick={this.clicked}>
          &nbsp; &nbsp; + New Progress &nbsp; &nbsp; &nbsp;
        </div></Reward>
        </center>

    );
  }
};

export default NewProgressButton;