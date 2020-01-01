//All middleware
var middlewareObj = {};

middlewareObj.checkHubOwenership = function(req, res, next){
    if(req.isAuthenticated()){

        //does user own the camp
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground)
            {
                req.flash("error", "Hub not found");
                res.redirect("back");
            }
            else{
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        req.flash("error", "Permission denied.");
                        res.redirect("back");
                    }
                
            }
        });
    }
    else{
        req.flash("error", "You need to login first");
        res.redirect("back");
    }
    
}

middlewareObj.checkCommentOwnership= function(req, res, next){
    if(req.isAuthenticated()){

        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment)
            {
                req.flash("error", "Comment not found");
                res.redirect("back");
            }
            else{
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        req.flash("error", "You don't have permission for this.");
                        res.redirect("back");
                    }
                
            }
        });
    }
    else{
        req.flash("error", "You need to login first");
        res.redirect("back");
    }
    
}

middlewareObj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

module.exports = middlewareObj;