const mongoose = require("mongoose");

const APISchema = new mongoose.Schema({
    fruit: {
        type: String,
        require: true,
    },
    size: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    }
})

const ApiModel= new mongoose.model("ApiTesting",APISchema);

module.exports = ApiModel;