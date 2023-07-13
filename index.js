const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
require("./src/Database/index");
 
// const SchedulerRouter = require("./src/Router/SchedulerRouter");
const WeekTreading = require("./src/Router/WeekTreading");
const uploaderImage = require("./src/Router/UploaderImage");
const mostTenWanted = require("./src/Router/topFiveList");

const app = express();
// app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

const port = process.env.PORT || 8888;

app.use(express.static(__dirname + '/uploads/'));

// app.use("/AnimeScheduler", SchedulerRouter);
app.use("/WeekTreading", WeekTreading);
app.use("/uploadImage", uploaderImage);
app.use("/topTen", mostTenWanted) 

 
app.listen(port, () => {
    console.log(`Connection Started ${port}`);
})