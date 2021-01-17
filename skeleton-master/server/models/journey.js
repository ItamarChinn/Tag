const mongoose = require("mongoose");

const JourneySchema = new mongoose.Schema({
        owner: String,
        goal_name: String,
        goal_frequency: Number, 
        goal_time_unit: String, 
        goal_unit: String, 
        goal_quantity: Number,
        theme: String,
        complete: Boolean,
    });

// compile model from schema
module.exports = mongoose.model("journey", JourneySchema);
