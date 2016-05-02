var express = require('express');
var usersRouter = express.Router();

// var passport = require("../../lib/passportStrategy");
var User = require("../../models/user");

usersRouter.post("/", function(req, res, next){
  User.create(req.body.user, function(err, dbUser){
    if(err){ res.status(500).end() }
    res.json(dbUser);
  });
});

usersRouter.get("/", function(req, res, next){
  User.find(function( err, dbUsers){
    res.json( dbUsers );
  });
});

