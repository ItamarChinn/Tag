import React, { Component } from "react";
import "./NewJourney.css";
import {get, post} from "../../utilities";


// /**
//  * New Post is a parent component for all input components
//  *
//  * Proptypes
//  * @param {string} defaultText is the placeholder text
//  * @param {string} storyId optional prop, used for comments
//  * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
//  */

// class NewPostInput extends Component {
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         value: "",
//       };
//     }
  
//     // called whenever the user types in the new post input box
//     handleChange = (event) => {
//       this.setState({
//         value: event.target.value,
//       });
//     };
  
//     // called when the user hits "Submit" for a new post
//     handleSubmit = (event) => {
//       event.preventDefault();
//       this.props.onSubmit && this.props.onSubmit(this.state.value);
//       this.setState({
//         value: "",
//       });
//     };
  
//     render() {
//       return (
//         <div className="u-flex">
//           <input
//             type="text"
//             placeholder={this.props.defaultText}
//             value={this.state.value}
//             onChange={this.handleChange}
//             className="NewPostInput-input"
//           />
//           <button
//             type="submit"
//             className="NewPostInput-button u-pointer"
//             value="Submit"
//             onClick={this.handleSubmit}
//           >
//             Submit
//           </button>
//         </div>
//       );
//     }
//   }


/**
 * New Journey button.
 * Takes as props from Dashboard:
 * @userId : String
 * @addNewJourney : function
 */
class NewJourney extends Component {
  state = {
    goal_name: "",
    goal_frequency: "",
    goal_time_unit: "Day",
    goal_quantity: "",
    theme: "",
    complete: false,
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
        e.preventDefault();
        //console.log(this.state);
        this.addJourney();
      }

    render() {   
        return (
        //<div className="NewJourney-button" onClick={this.addJourney}> 
       // &nbsp; &nbsp; + New Journey&nbsp; &nbsp; &nbsp; 
        //</div>

        <div className="NewJourney-popup">
            <form>
              Name your adventure: 
              <input 
              type="text"
              name="goal_name"
              placeholder="Reading" 
              onChange={e => this.change(e)} 
              />
              <br />
              Goal details: <input 
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
              Frequency: <input 
              type="number" 
              name="goal_frequency" 
              placeholder="1"
              onChange={e => this.change(e)}
              /> times per
              <select name="goal_time_unit" onChange={e => this.change(e)}> 
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
              </select>
              <br />
              <button onClick={e => this.onSubmit(e)}>Submit </button>

            </form>
          </div>

        );
  }
};

export default NewJourney;