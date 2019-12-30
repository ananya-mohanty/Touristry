var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose'),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment")
    
seedDB();
var commentRoutes   = require("./routes/comments"),
campgroundRoutes    = require("./routes/campgrounds"),
indexRoutes         = require("./routes/index")

mongoose.connect('mongodb://localhost:27017/yelpcamp_v4',  { useUnifiedTopology: true } ); 

//mongoose.connect("mongodb://localhost:27017/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
//console.log(__dirname);
//console.log("HELLLO");


app.use(require("express-session")({
    secret: "You are tooo curious to know eh?",
    resave: false,
    saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
 });
 
 //Adding all the routes to app.js
 app.use("/", indexRoutes);
 app.use("/campgrounds", campgroundRoutes);
 app.use("/campgrounds/:id/comments",commentRoutes);
 
//Campground routes


// ======
//COMMENTS ROUTES
// ========\

//==========================
// AUTH ROUTES
//==========================


app.listen(process.env.PORT||3000, function(){
    console.log("The YelpCamp Server has started");
});
