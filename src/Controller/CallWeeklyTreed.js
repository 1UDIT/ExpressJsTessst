require("../Database/index");



const WeeklyAPI = require("../models/WeeklyApiFormat");

const getCallWeeklyTread = async (req, res, next) => {
    // console.log(req.headers);
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
            const RespData = await WeeklyAPI.find({});
            res.status(200).send(RespData);
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

const postCallWeeklyTread = async (req, res, next) => {
    // console.log(req.body);
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
            //    const Api = mongoose.find({Monday: req.body})  
            const addingAPI = new WeeklyAPI(req.body);
            const apiSave = await addingAPI.save();
            res.status(201).send(apiSave);
        } catch (e) {
            res.status(400).send(e);
        }
        next();
    }else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}




module.exports = { getCallWeeklyTread, postCallWeeklyTread }; 