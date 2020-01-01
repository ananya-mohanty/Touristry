var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose'),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override");
    Campground      = require("./models/campground"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment")
    
//seedDB();
var commentRoutes   = require("./routes/comments"),
campgroundRoutes    = require("./routes/campgrounds"),
indexRoutes         = require("./routes/index")

mongoose.connect("mongodb+srv://ananyam:ananya@cluster0-vhhbv.mongodb.net/touristry?retryWrites=true&w=majority"); 

//mongoose.connect("mongodb://localhost:27017/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
//console.log(__dirname);
//console.log("HELLLO");
app.use(methodOverride("_method"));
app.use(flash());
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
    res.locals.error     = req.flash("error");
    res.locals.success     = req.flash("success");
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
    console.log("The Touristry Server has started");
});
