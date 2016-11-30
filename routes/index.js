var express = require('express');
var router = express.Router();

// link to the Team model
var Team = require('../models/team');

// GET
router.get('/', function (req, res, next) {
  res.render('index');
});

//here come those teams
router.get('/teams', function (req, res, next) {
  //use team model to get lal the teams
  Team.find(function (err, teams) {
    if (err) {
      return next(err);
    }
    //if no errors, json will send to factory
    res.json(teams);
  });
});

router.post('/teams', function(req,res,end) {
  //get the team request
  var team = new Team(req.body);

  //use the database
  team.save(function(err, team) {
    if (err) {
      return next(err);
    }
    //send the new stuff back to json
    res.json(team);
  });
});
//deeleet
router.delete('/teams/:_id', function(req,res,next) {
    var _id = req.params._id;
    Team.remove ({ _id: _id}, function(err, team) {
      if (err) {
        return next(err);
      }
      res.json(team);
    });
});
//update

router.put('/teams/:_id', function(req,res,next) {
  var modifiedTeam = new Team(req.body);
  Team.update({ _id: modifiedTeam._id }, modifiedTeam, function(err, modifiedTeam) {
    if (err) {
      return next(err);
    }
    res.json(modifiedTeam);
  })
});
// make public
module.exports = router;

