const mongoose = require('mongoose');

const allrounder = new mongoose.Schema({
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
    score:{
        type:Number,
        required:true
    }
})

const allroundermodel = mongoose.model('Allrounder',allrounder);

module.exports = allroundermodel;