var mongoose = require("mongoose");
var bcrypt   = require("bcryptjs");


var UserSchema = new mongoose.Schema({
  username: {
         type: String,
    lowercase: true,
       unique: true,
     required: true
  },
  email: {
         type: String,
    lowercase: true,
       unique: true,
     required: true
  },
  password: {
        type: String,
    required: true
  }
}, { timestamps: true });

// make sure we hash a password before saving a user to DB
UserSchema.pre("save", function(next){
  var user = this; // could just use this
  if( user.isModified("password") || user.isNew ){
    user.password = bcrypt.hashSync( user.password, 10);
  }
  next();
});

// authentication method that confirms if the password is valid
UserSchema.methods.authenticate = function(passwordTry){
  return bcrypt.compareSync(passwordTry, this.password);
};


module.exports = mongoose.model("User", UserSchema);
