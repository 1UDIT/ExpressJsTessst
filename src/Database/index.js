const mongoDB = require('mongoose');

mongoDB.connect("mongodb://0.0.0.0:27017/test")
.then(()=>console.log("connection Successfully"))
.catch((err)=>console.log(err)); 