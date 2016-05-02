var express = require('express');
var usersRouter = express.Router();
var passport = require("../../lib/passportStrategy");
var User = require("../../models/user");

// usersRouter.post("/", function(req, res, next){
//   User.create(req.body.user, function(err, dbUser){
//     if(err) { res.status(500).end() }
//     res.json( dbUser );
//   });
// });

usersRouter.post("/", function(req, res, next){

  if( !req.body.email || !req.body.password || !req.body.username ){
    res.json({ sucess: false, message: "Incomplete Submission"});
  } else {
    var newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    //attempt to save new user
    newUser.save( function(err){
      if(err){
        return res.json({ success: false, message: "Possible Duplicate"});
      }
      res.json({ success: true, message: "successfully created new user."});
    });

  }

});


usersRouter.get("/", function(req, res, next){
  User.find(function( err, dbUsers){
    res.json( dbUsers );
  });
});

module.exports = usersRouter;
