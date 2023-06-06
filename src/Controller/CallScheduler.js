require("../Database/index");



const ApiDemo = require("../models/ApiFormat");

const getAnimeSchedule = async (req, res) => {
    try {
        // const FindingData = await ApiDemo.aggregate([
        //     // { "$match": { "day": "Monday" } },    
        //     {
        //         $group: { 
        //             _id: "$day",
        //             appInfos: {
        //                 $push: {
        //                     title: "$title",
        //                     day: "$day",
        //                     Studio: "$Studio",
        //                     description:"$description",
        //                     img:"$img",
        //                     Time:"$Time",
        //                     _id:"$_id",
        //                 }
        //             }
        //         }
        //     }
        // ]);

        const FindingData = await ApiDemo.aggregate([
            // { "$match": { "day": { "$in": ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }  } },
            {
                "$sort": {
                    day: 1, 
                    Time:1, 
                }
            },
            {
                "$project": {
                    title: "$title",
                    day: "$day",
                    Studio: "$Studio",
                    description: "$description",
                    img: "$img",
                    Time: "$Time",
                    _id: "$_id",
                }
            }          
            
        ]);
        // console.log(ApiDemo.find({title}));
        const RespData = await ApiDemo.find({});
        res.status(200).send(FindingData);
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
        console.log("query", query.value.$regex);
        const userFound = await ApiDemo.find({ title: query.value.$regex });
        // console.log(userFound);
        res.status(200).send(userFound);
    } catch (e) {
        res.status(400).send(e);
    }
}



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