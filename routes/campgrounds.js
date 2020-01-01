var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");
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

router.post("/", middleware.isLoggedIn ,function(req, res){
    // get data from form and add to campground array
    // redirect to  list
    //res.send("HIT THE POST");
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var description = req.body.description;
    var newCampground={name: name, price: price, image: image, description: description, author: author};
    
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

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});


router.get("/:id", function(req, res){

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Hub not found!");
            res.redirect("back");
        }
       
        else{
            // console.log(foundCampground);
        res.render("campgrounds/show", {campground: foundCampground});
         }


    });
    
});
//EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkHubOwenership, function(req, res){

       Campground.findById(req.params.id, function(err, foundCampground){

                
                 res.render("campgrounds/edit", {campground: foundCampground});
        });
});
//update
router.put("/:id", middleware.checkHubOwenership ,function(req, res){
    //find and update the correct campground
    //redirect
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err)
        {
            //console.log(err);

            res.redirect("/campgrounds");
        }
        else{
            //res.send("EDITING");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//destroy campground
router.delete("/:id/", middleware.checkHubOwenership ,function(req, res){

    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });

});



module.exports = router;
