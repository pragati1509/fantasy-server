const mongoose = require("mongoose");

const WKSchema =  mongoose.Schema({
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
    catches:{
        type:Number,
        required:true
    },
    stumpings:{
        type:Number,
        required:true
    },
    score:{
        type:Number,
        required:true
    }
});

const WKmodel = mongoose.model("Wicketkeeper",WKSchema);

module.exports = WKmodel;