require("../Database/index");



const WeeklyAPI = require("../models/WeeklyApiFormat");

const getCallWeeklyTread = async (req, res) => {
    try {
        const RespData = await WeeklyAPI.find({});
        res.status(200).send(RespData);
    } catch (e) {
        res.status(400).send(e);
    }
}

const postCallWeeklyTread = async (req, res) => {
    console.log(req.body);
    try {
        //    const Api = mongoose.find({Monday: req.body})  
        const addingAPI = new WeeklyAPI(req.body);
        const apiSave = await addingAPI.save();
        res.status(201).send(apiSave);
    } catch (e) {
        res.status(400).send(e);
    }
}




module.exports = { getCallWeeklyTread, postCallWeeklyTread }; 