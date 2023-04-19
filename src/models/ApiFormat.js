const mongoose = require("mongoose");

const APISchema = new mongoose.Schema({
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
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ApiModel = new mongoose.model("AnimeSchedule", APISchema);

module.exports = ApiModel;

// const mongoose = require("mongoose");
// var ObjectID = require('mongodb').ObjectId;
// const APISchema = new mongoose.Schema({
//        fruit: {
//             type: String,
//             require: true,
//         },
//         size: {
//             type: String,
//             require: true,
//         },
//         color: {
//             type: String,
//             require: true,
//         }
//     })



// const ApiModel = new mongoose.model("ApiTesting", APISchema);

// module.exports = ApiModel;