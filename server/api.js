/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Journey = require("./models/journey");
const Progress = require("./models/progress");

// import authentication library
const auth = require("./auth");



// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/progress", (req, res) => {
  Progress.find({journeyId: req.query.journeyId}).then((progress) => {
    res.send(progress);
  })
});

router.post("/deleteprogress", auth.ensureLoggedIn, (req, res) => {
  Progress.findByIdAndDelete(req.body.progressId).then((progress) => res.send(progress));
});

router.post("/deletejourney", auth.ensureLoggedIn, (req, res) => {
  Journey.findByIdAndDelete(req.body.journeyId).then((journey) => res.send(journey));
});

router.post("/editprogress", auth.ensureLoggedIn, (req, res) => {
  Progress.findById(req.body.progressId).then((newProgress) => {
    if (newProgress) {
      newProgress.progress_quantity = req.body.updatedProgress;
      newProgress.editingMode = req.body.editingMode;
      newProgress.datetime = req.body.datetime;
      newProgress.comment = req.body.comment;
      newProgress.save().then((progress) => res.send(progress));
    }
    else {console.log("Could not find progress")}
  });
});

router.post("/editjourney", auth.ensureLoggedIn, (req, res) => {
  Journey.findById(req.body.journeyId).then((newJourney) => {
    if (newJourney) {
      newJourney.goal_name = req.body.goal_name;
      newJourney.goal_frequency = req.body.goal_frequency;
      newJourney.goal_time_unit = req.body.goal_time_unit;
      newJourney.goal_quantity = req.body.goal_quantity;
      newJourney.theme = req.body.theme;
      newJourney.startDate = req.body.startDate;
      newJourney.endDate = req.body.endDate;
      newJourney.save().then((journey) => res.send(journey));
    }
    else {console.log("Could not find journey")}
  });
});

router.post("/completejourney", auth.ensureLoggedIn, (req, res) => {
  Journey.findById(req.body.journeyId).then((newJourney) => {
    if (newJourney) {
      newJourney.complete = req.body.complete
      newJourney.save().then((journey) => res.send(journey));
    }
    else {console.log("Could not find journey")}
  });
});

router.post("/progress", auth.ensureLoggedIn, (req, res) => {
  const newProgress = new Progress({
    journeyId: req.body.journeyId,
    progress_quantity: req.body.progress_quantity,
    goal_unit: req.body.goal_unit,
    datetime: req.body.datetime,
    editingMode: req.body.editingMode,
    comment: req.body.comment,
  });

  newProgress.save().then((progress) => res.send(progress));
});


router.get("/journey", (req, res) => {
  Journey.find({owner: req.user._id, complete: req.query.complete}).then((journey) => {
    res.send(journey);
  })
});

router.post("/journey", auth.ensureLoggedIn, (req, res) => {
  const newJourney = new Journey({
    owner: req.user._id,
    goal_name: req.body.goal_name,
    goal_frequency: req.body.goal_frequency, 
    goal_time_unit: req.body.goal_time_unit, 
    goal_unit: req.body.goal_unit, 
    goal_quantity: req.body.goal_quantity,
    theme: req.body.theme,
    complete: req.body.complete,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  newJourney.save().then((journey) => res.send(journey));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
