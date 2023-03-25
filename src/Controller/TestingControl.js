require("../Database/index");

const ApiDemo = require("../models/ApiFormat");

const getTestingApi = async (req, res) => {
    try {
        const RespData = await ApiDemo.find({});
        res.status(200).send(RespData);
    } catch (e) {
        res.status(400).send(e);
    }
}
const postTestingApi = async (req, res) => {
    try {
        const addingAPI = new ApiDemo(req.body);
        console.log(req.body);
        const apiSave = await addingAPI.save();
        res.status(201).send(apiSave);
    } catch (e) {
        res.status(400).send(e);
    }
}

module.exports = { getTestingApi, postTestingApi }; 