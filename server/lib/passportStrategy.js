var User = require("../models/user.js"),
    passport = require("passport"),
    jwtConfig = require("../config/jwt.js"),
    LocalStrategy = require("passport-local").Strategy,
    JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt,
    JwtOpts = {};

JwtOpts.jwtFromRequest = function(req){
  var token = null;
  if( req && req.cookies){
    token = req.cookies['jwt_token'];
  }
  return token;
};

JwtOpts.secretOrKey = jwtConfig.superSecret;

passport.use( new JwtStrategy( JwtOpts, function( jwt_payload, done){
  console.log(jwt_payload);

  User.findOne({ id: jwt_payload.sub }, function(err, user){
    if(err){
      return done(err, false);
    }

    if( user ){
      done( null, user);
    } else {
      done(null, false);
    }
  });
}));

passport.use( new LocalStrategy( function(username, password, done){
  User.findOne({ username: username }, function(err, dbUser){
    if(err){ return done(err); }

    if(!dbUser){
      return done( null, false);
    }

    if( !dbUser.authenticate(password) ){
      return done( null, false);
    }

    return done(null, dbUser);
  })
}) );


module.exports = passport;
