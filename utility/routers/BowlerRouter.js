const express = require('express');
const bodyParser = require('body-parser');
const Bowler = require('../models/BowlerModel');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/bowler',async function (req, res) {
  try {
    const team1 = req.query.team1;
    const team2 = req.query.team2;
    const limit = req.query.limit;

    const players = await Bowler.find({ team: { $in: [team1, team2] } }).select({ name: 1, team: 1, _id: 0 }).sort({ score: -1 }).limit(limit);

    res.send(players);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
})

app.post('/bowler', function (req, res) {
  const query = Bowler.findOne({ jerseyNo: req.body.jerseyNo }, function (err, found) {
    query.$where = true
    if (err)
      console.log(err);

    if (found) {
      res.status(401).send('already registered');
    } else {
      const player = new Bowler({
        jerseyNo: req.body.jerseyNo,
        name: req.body.name,
        team: req.body.team,
        matchesPlayed: req.body.matchesPlayed,
        wickets: req.body.wickets,
        average: req.body.average,
        economy: req.body.economy,
        threeWicketHaul: req.body.threeWicketHaul,
        score: calculateScore(req.body)
      });
      player.save();
      res.status(200).send('ok');
    }

  })
  calculateScore(req.body);
})

function calculateScore(body) {
  let score = 0;
  score += Math.floor(body.matchesPlayed * 100 / 300 * 0.2);
  score += Math.floor(body.wickets * 100 / 150 * 0.4);
  score -= Math.floor(body.average * 100 / 40 * 0.8);
  score -= Math.floor(body.economy * 100 / 10 * 0.9);
  score += Math.floor(body.threeWicketHaul * 100 / 20 * 0.3);
  console.log(score);
  return score;
}

module.exports = app;