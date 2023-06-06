const mongoose = require("mongoose");

const ImageUploaderFormat = new mongoose.Schema({ 
    img: {
        data: Buffer,
        contentType: String,
    },
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});
 
module.exports = ApiModel = mongoose.model("UploadImage", ImageUploaderFormat);

 