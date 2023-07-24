const imageModel = require("../models/ImageUploaderFormat");
const fs = require("fs");
const cloudinary = require("../cloudinary Database/index");



// const PostimageUpload = async (req, res ) => {

//         const saveImage = imageModel({
//             name: req.body.name,
//             img: {
//                 data: fs.readFileSync("uploads/" + req.file.filename),
//                 contentType: req.file.mimetype,
//                 path: req.file.path,
//                 name: req.file.originalname
//             },
//             title: req.body.title,
//             description: req.body.description,
//             day: req.body.day,
//             Time: req.body.Time,
//             Studio: req.body.Studio,
//             createdAt: req.body.createdAt
//         });
//         saveImage
//             .save()
//             .then((res) => {
//                 console.log("image is saved");
//             })
//             .catch((err) => {
//                 console.log(err, "error has occur");
//             });
//         res.send('image is saved');

// }


const PostimageUpload = async (req, res, next) => {
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

        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'schedule'
            });
            const cloudinary_id = result.public_id;

            try {

                const saveImage = imageModel({
                    name: req.body.name,
                    profile_img: result.secure_url,
                    cloudinary_id: result.public_id,
                    title: req.body.title,
                    description: req.body.description,
                    day: req.body.day,
                    Time: req.body.Time,
                    Studio: req.body.Studio,
                    Season: req.body.Season,
                    createdAt: req.body.createdAt
                });

                saveImage
                    .save()
                    .then((resp) => {
                        console.log("Data Save");
                    })
                    .catch((err) => {
                        console.log("error has occur", err);
                    });

                res.status(201).send("Data Save");

            } catch (mongoErr) {
                console.log(`Removing ${cloudinary_id} due to failed save`);
                await cloudinary.uploader.destroy(cloudinary_id);
                throw mongoErr;
            }




        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
        next();
    }
    else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}


const GetimageUpload = async (req, res, next) => {
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
        try {
            const sortData = await imageModel.aggregate([
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
                        Season: "$Season",
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
        next();
    } else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}


const FindDetail = async (req, res, next) => {
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
        try {
            let query = {
                value: {
                    $regex: req.params.value,
                }
            };
            console.log("query", query.value.$regex);
            const userFound = await imageModel.find({ title: query.value.$regex });
            // console.log(userFound);
            res.status(200).send(userFound);
        } catch (e) {
            res.status(400).send(e);
        } next();
    } else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}




module.exports = { PostimageUpload, GetimageUpload, FindDetail }; 