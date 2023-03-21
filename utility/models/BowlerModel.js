const mongoose = require('mongoose');

const bowler = new mongoose.Schema({
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
    wickets:{
        type:Number,
        required:true
    },
    average:{
        type:Number,
        required:true 
    },
    economy:{
        type:Number,
        required:true
    },
    threeWicketHaul:{
        type:Number,
        required:true
    },
    score:{
        type:Number,
        required:true
    }

})

const bowlermodel = mongoose.model('Bowler',bowler);

module.exports =  bowlermodel;