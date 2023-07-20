require("../Database/index");
const fs = require("fs");
const cloudinary = require("../cloudinary Database/index");


const ApiDemo = require("../models/ApiFormat");

const getFiveData = async (req, res) => {
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
                    Time: 1,
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



const postFiveData = async (req, res, next) => {
    const authheader = req.headers.authorization;

    if (!authheader) {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }

    const auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user == process.env.LoginUsername && pass == process.env.LoginPassword) {
        const result = await cloudinary.uploader.upload(req.file.path);
        const saveImage = ApiDemo({
            name: req.body.name,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id,
            title: req.body.title,
            description: req.body.description,
            day: req.body.day,
            Time: req.body.Time,
            Studio: req.body.Studio,
            createdAt: req.body.createdAt
        });
        saveImage
            .save()
            .then((res) => {
                console.log("image is saved");
            })
            .catch((err) => {
                console.log(err, "error has occur");
            });
        res.send('image is saved')
        next();
    }
    else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}




module.exports = { getFiveData, postFiveData, FindDetail }; 