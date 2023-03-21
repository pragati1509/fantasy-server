const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Allrounder = require('../models/AllrounerModel');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/allrounder',async function (req, res) {
  try {
    const team1 = req.query.team1;
    const team2 = req.query.team2;
    const limit = req.query.limit;

    const players = await Allrounder.find({ team: { $in: [team1, team2] } }).select({ name: 1, team: 1, _id: 0 }).sort({ score: -1 }).limit(limit);

    res.send(players);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/allrounder', function (req, res) {
  const query = Allrounder.findOne({ jerseyNo: req.body.jerseyNo }, function (err, found) {
    query.$where = true
    if (err)
      console.log(err);

    if (found) {
      res.status(401).send('already registered');
    } else {
      const player = new Allrounder({
        jerseyNo: req.body.jerseyNo,
        name: req.body.name,
        team: req.body.team,
        matchesPlayed: req.body.matchesPlayed,
        runsScored: req.body.runsScored,
        wickets: req.body.wickets,
        average: req.body.average,
        economy: req.body.economy,
        score: calculateScore(req.body)
      }

      );

      player.save();
      res.status(200).send('ok');
    }

  }).clone();
  calculateScore(req.body);
});

function calculateScore(body) {
  let score = 0;
  score += Math.floor(body.matchesPlayed * 100 / 300 * 0.2);
  score += Math.floor(body.runsScored * 100 / 6000 * 0.3);
  score += Math.floor(body.wickets * 100 / 150 * 0.4);
  score += Math.floor(body.average * 100 / 40 * 0.8);
  score -= Math.floor(body.economy * 100 / 10 * 0.9);
  console.log(score);
  return score;
}
module.exports = app;