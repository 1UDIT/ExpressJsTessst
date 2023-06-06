require("../Database/index");



const imageModel = require("../models/ImageUploaderFormat");
const fs = require("fs");



const PostimageUpload = async (req, res) => {
    // console.log(req.file);

    const saveImage = imageModel({
        name: req.body.name,
        img: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/png",
        },
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
}


const GetimageUpload = async (req, res) => {
     
    try {
        const sortData = await imageModel.aggregate([             
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
        const RespData = await imageModel.find({});
        res.status(200).send(sortData);
    } catch (e) {
        res.status(400).send(e);
    }
}



module.exports = { PostimageUpload, GetimageUpload }; 