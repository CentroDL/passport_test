// initial dependencies
var express      = require("express"),
    morgan       = require("morgan"),
    mongoose     = require("mongoose"),
    bodyParser   = require("body-parser"),
    cookieParser = require("cookie-parser"),
    app          = express();

var indexRouter    = require("./server/routes/index");
var apiUsersRouter = require("./server/routes/api/users");

//connect to the db
mongoose.connect( "mongodb://localhost/passport101");

//log requests to stdout
app.use( morgan('dev') );

// Use body parser to get POST requests for API use
// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended: true }) );
// parse application/json
app.use( bodyParser.json() );

// parse cookies
app.use( cookieParser() );

// set static folders
app.use( express.static("client/public") );

//set routing logic
app.use('/', indexRouter);
app.use("/api/users", apiUsersRouter);

// app.use('/api/auth', apiAuthRouter);


//listen on port 3000 for requests
var port = 3000
app.listen( port, function(){
  console.log("free tacos on port 3000");
});

