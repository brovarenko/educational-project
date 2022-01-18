const News = require('../models/news.js')
const Disciplines = require('../models/disciplines.js')
const Post = require('../models/post.js')


exports.getNews = function(request, response, next){

    
  
    News.find({}, function(err, news){
  
        if(err) {
            console.log(err)
            return next(err)
        }
        
        response.render("news", {
            news: news,
            isNews:true,
            isToken:false
        })
        
    })
    
}

exports.dis = function(request, response){
    const dis = request.params["dis"];
    console.log(dis)
   News.find({disciplines:dis}, function(err, news){
 
       if(err) {
           console.log(err);
           return response.sendStatus(400);
       }
      
       response.render("news", {
        news: news
        
    })

   })
}