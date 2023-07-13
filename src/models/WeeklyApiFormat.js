const mongoose = require("mongoose");

const WeeklyAPI = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    Studio: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
        path: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TrendWeekly = new mongoose.model("WeeklyTreading", WeeklyAPI);

module.exports = TrendWeekly;
 