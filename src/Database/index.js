const mongoDB = require('mongoose');
const DB = process.env.DATABASE;

mongoDB.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("connection Successfully"))
.catch((err)=>console.log(err)); 


 