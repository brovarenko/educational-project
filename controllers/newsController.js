const News = require('../models/news.js')

exports.addNews = function (request, response){
    response.render("createNews.hbs");
};
exports.getNews = function(request, response){
     
    News.find({}, function(err, allNews){
  
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("news.hbs", {
            news: allNews,
            isNews:true
        });
    });
};
exports.postNews= function(request, response){
    if(!request.body) return response.sendStatus(400);
    const newsName = request.body.name;
    const newsText = request.body.text;
    const news = new News({name: newsName, text: newsText});
     
    news.save(function(err){
        if(err) return console.log(err);
        response.redirect("/news");
    });
};
exports.getPost = function(request, response){
     const id = request.params.id;
    News.findById(id, function(err, allNews){
  
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("post.hbs", {
            news: allNews
            
        });
    });
};
exports.deletePost = function(request, response){
    const id = request.params.id;
   News.findByIdAndDelete(id, function(err, allNews){
 
       if(err) {
           console.log(err);
           return response.sendStatus(400);
       }
       response.redirect('/news')
   });
};