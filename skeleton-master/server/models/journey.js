const mongoose = require("mongoose");

const JourneySchema = new mongoose.Schema({
        owner: String,
        goal: {
            frequency: Number, 
            time_unit: String, 
            goal_unit: String, 
            goal_quantity: Number},
        theme: String,
    });

// compile model from schema
module.exports = mongoose.model("journey", JourneySchema);
