var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");

//Root route
router.get("/", function(req, res){

    res.render("landing");

});

//register forms
router.get("/register", function(req, res){
    res.render("register");
});
//handle sign up

router.post("/register", function(req, res){

    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err)
            {
                req.flash("error", err.message);
                return res.redirect("/register");
                //return res.render("register");
            }

            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to Touristry, " + user.username);
                res.redirect("/campgrounds");
            });
    });
});
//LOGIN Form
router.get("/login", function(req, res){

    res.render("login");

});

router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect:"/login"
}), function(req, res){
   // req.flash("success", "Logged in as: "+ user.username );
   
});

//LogOut 
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;