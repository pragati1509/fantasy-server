const mongoose = require("mongoose");

const batterSchema =  mongoose.Schema({
    jerseyNo:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    team:{
        type:String,
        required:true
    },
    matchesPlayed:{
        type:Number,
        required:true
    },
    runsScored:{
        type:Number,
        required:true
    },
    strikeRate:{
        type:Number,
        required:true
    },
    average:{
        type:Number,
        required:true
    },
    fifties:{
        type:Number,
        required:true
    },
    score:{
        type:Number,
        required:true
    }
});

const batterModel = mongoose.model("Batter",batterSchema);

module.exports = batterModel;