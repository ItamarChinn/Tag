import React, { Component } from "react";
import "./NewProgressButton.css";
import Reward from 'react-rewards';


/**
 * NewProgressButton is a button that adds a new SingleProgress component to the JourneyCard
 * It inherits its props from JourneyCard:
 * @addNewProgress : function,
 * @userId : String,
 * @journeyId : String,
 * @goal_unit : String,
 * @addNewProgress : function,
 * @theme : String, ("space", "ocean" or "forest")
 */


class NewProgressButton extends Component {
  constructor(props) {
    super(props);
  }

  // triggers the addNewProgress function in JourneyCard which adds the progress to the DB
  // triggers emoji confetti effect from react-rewards
  clicked = () => {
    this.props.addNewProgress();
    this.reward.rewardMe()
  }

  render() {
    // depending on the the theme different emojis are shot out of the button
    let emoji_array = null;
    if (this.props.theme === "space") {
      emoji_array = ["🌎", "🚀", "🛸", "🌔", "🪐", "☄️", "🌌", "☀️"];
    } else if (this.props.theme === "forest") {
      emoji_array = ["🏡", "🤸", "🐯", "🐘", "🌲", "🐒", "⛺"];
    } else if (this.props.theme === "ocean") {
      emoji_array = ["🏖️", "⛵", "🦈", "🐙", "🐬", "🐚", "🏝️"];
    }


    return (
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