const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Batter = require('../models/BatterModel');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/batter',async function(req,res){
   try{
      const team1 = req.query.team1;
      const team2 = req.query.team2;
      const limit = req.query.limit;

      const players = await Batter.find({ team: { $in: [team1, team2] } }).select({name:1,team:1,_id:0}).sort({ score: -1 }).limit(limit);

      res.send(players);
   }catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});
app.post('/batter',function(req,res){
   const query = Batter.findOne({jerseyNo:req.body.jerseyNo},function(err,found){
    query.$where = true
      if(err)
        console.log(err);

      if(found){
        res.status(401).send('already registered');
      }else{
        const player = new Batter({
          jerseyNo : req.body.jerseyNo,
          name : req.body.name,
          team : req.body.team,
          matchesPlayed : req.body.matchesPlayed,
          runsScored : req.body.runsScored,
          strikeRate : req.body.strikeRate,
          average : req.body.average,
          fifties : req.body.fifties,
          score : calculateScore(req.body)
        });
        player.save();
        res.status(200).send('ok');
      }
    
   }).clone();
}); 

function calculateScore(body){
    var score = Math.floor(body.matchesPlayed*100 /300 *0.2);
    score+= Math.floor(body.runsScored*100 / 8000*0.4);
    score += Math.floor(body.strikeRate*100 / 150 *0.8);
    score += Math.floor(body.average*100 /50 *0.9);
    score += Math.floor(body.fifties*100 / 50 *0.3);
    return score;
}

module.exports = app;