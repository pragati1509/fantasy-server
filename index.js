require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
const conn = require("./utility/connectDB")
const session = require("./session");


const userRouter = require("./utility/routers/UserRouter");
const BatterRouter = require('./utility/routers/BatterRouter')
const BowlerRouter = require('./utility/routers/BowlerRouter')
const AllrounderRouter = require('./utility/routers/Allrounder')
const WicketKeeprRouter = require('./utility/routers/wicketkeeper')


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(session);
app.use(userRouter);
app.use(BatterRouter);
app.use(BowlerRouter);
app.use(AllrounderRouter);
app.use(WicketKeeprRouter);


app.listen(3000,function(err,res){
    if(err) 
       throw err;

    console.log("successfully started the server");
})