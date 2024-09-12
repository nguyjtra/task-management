const express=require('express');
require('dotenv').config()
const app=express();
// data base
const database = require("./config/database");
database.connect();
//end
const port=process.env.PORT

const routeAPI=require('./routes/client/index.route')

routeAPI(app);

app.listen(port,()=>{
    console.log(`listen port ${port}`)
})