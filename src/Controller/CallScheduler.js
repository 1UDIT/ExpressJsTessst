require("../Database/index");



const ApiDemo = require("../models/ApiFormat");

const getAnimeSchedule = async (req, res) => {
    console.log("runningGet");
    try {
        const RespData = await ApiDemo.find({});
        res.status(200).send(RespData);
    } catch (e) {
        res.status(400).send(e);
    }
}
const FindDetail = async (req, res) => {
    console.log("running");
    try {
        let query = {
            value: {
                $regex: req.params.value,
            }
        };
        console.log("query",query.value.$regex);
        const userFound = await ApiDemo.find({title:query.value.$regex});
        // console.log(userFound);
        res.status(200).send(userFound);
    } catch (e) {
        res.status(400).send(e);
    }
}

// const FindDetail = async (req, res) => {
//     console.log("running");
//     try {
//         const userFound = await ApiDemo.find({title:query});
//         console.log(userFound);
//         res.status(200).send(userFound);
//       } catch (err) {
//         console.log(err);
//       }
      
// }

const postAnimeSchedule = async (req, res) => {
    console.log(req.body);
    try {
        //    const Api = mongoose.find({Monday: req.body})  
        const addingAPI = new ApiDemo(req.body);
        const apiSave = await addingAPI.save();
        res.status(201).send(apiSave);
    } catch (e) {
        res.status(400).send(e);
    }
}




module.exports = { getAnimeSchedule, postAnimeSchedule, FindDetail }; 