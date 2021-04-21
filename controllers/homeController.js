const Post = require('../models/post.js')
exports.index = function (request, response) {
    response.render("index.hbs",{isHome:true});
};

exports.form=(req,res)=>{
    res.render('postHome',{title:'Post'})
}

exports.submit = (req, res, next) => {
    const body = req.body.body; 
    const title = req.body.title; 
    const user = res.locals.user;
    const username = user ? user.name : null;
    const post = new Post({
    username: username,
    title : title,
    body: body
    });
    post.save((err) => {
    if (err) return next(err);
    res.redirect('/postlist') ;
    });
    };
    
    exports.getPost=(req,res,next)=>{
        Post.find({}, function(err, post){
  
            if(err) {
                console.log(err);
                return response.sendStatus(400);
            }
            res.render("PostList", {
                title: 'Post',
                post: post
                
            })
        })
    }