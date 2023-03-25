const express = require('express');

// require("./src/Database/index");

// const ApiDemo = require("./src/models/ApiFormat");
const TestRouter = require("./src/Router/Testing");

const app = express();
app.use(express.json());
const port = process.env.PORT || 8888;

app.use("/apiDemo", TestRouter)

// app.post("/apiDemo", async (req, res) => {
//     try {
//         const addingAPI = new ApiDemo(req.body);
//         console.log(req.body);
//         const apiSave = await addingAPI.save();
//         res.status(201).send(apiSave);
//     } catch (e) {
//        res.status(400).send(e);
//     }
// });

// app.get("/",async(req,res)=>{
//     try {
//         const RespData = await ApiDemo.find({});
//         res.status(200).send(RespData);
//     } catch (e) {
//        res.status(400).send(e);
//     }
// });

app.listen(port, () => {
    console.log(`Connection Started ${port}`);
})