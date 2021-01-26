const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
        journeyId: String,
        progress_quantity: Number,
        goal_unit: String, 
        datetime: Date,
        editingMode: Boolean,
        comment: String,
    });

// compile model from schema
module.exports = mongoose.model("progress", ProgressSchema);
