var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//Index route
router.get("/", function(req, res){

   Campground.find({}, function(err, allCampgrounds){
        if(err)
            console.log(err);
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }


   });
    //res.render("campgrounds", {campgrounds: campgrounds});
});  

router.post("/", isLoggedIn ,function(req, res){
    // get data from form and add to campground array
    // redirect to  list
    //res.send("HIT THE POST");
    var name=req.body.name;
    var image=req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var description = req.body.description;
    var newCampground={name: name, image: image, description: description, author: author};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err)
        {
            console.log(err);
        }

        else{
            res.redirect("/campgrounds");

        }

    });
    // Campground.push(newCampground);
    // res.redirect("/campgrounds");
});

router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res){

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err)
        console.log(err);
        else{
            // console.log(foundCampground);
        res.render("campgrounds/show", {campground: foundCampground});
         }


    });
    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
