const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

// require("./src/Database/index");

// const ApiDemo = require("./src/models/ApiFormat");
const SchedulerRouter = require("./src/Router/SchedulerRouter");

const app = express();
// app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

const port = process.env.PORT || 8888;

app.use("/AnimeScheduler", SchedulerRouter);

 
app.listen(port, () => {
    console.log(`Connection Started ${port}`);
})