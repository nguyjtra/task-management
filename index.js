const express=require('express');
const bodyParser=require('body-parser')
require('dotenv').config()
var cors=require('cors')
const app=express();
// data base
const database = require("./config/database");
database.connect();
//end
const port=process.env.PORT 

const routeAPI=require('./routes/client/index.route')

//cors

// app.use(cors()) for all domain
const corsOption={
    origin: 'http://abc.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOption))
//end cors

//body parse
//using for json
app.use(bodyParser.json());
//end body parse
routeAPI(app);

app.listen(port,()=>{
    console.log(`listen port ${port}`)
})