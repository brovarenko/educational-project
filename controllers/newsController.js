const News = require('../models/news.js')
const Disciplines = require('../models/disciplines.js')
var async = require('async');

exports.addNews = function (request, response){
    
    Disciplines.find({}, function(err, disciplines){
  
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
        
        response.render("createNews.hbs", {
           
            disciplines:disciplines
            
        })
        
    })
   
}
exports.getNews = function(req, res, next){

    async.parallel({
        news: function(callback) {
            News.find({}).sort({_id:-1}).populate('disciplines').exec(callback)
                
            
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('news', { title: 'News', news:results.news, isNews:true, disciplin:results.disciplines });
    });
  
    
    
}
exports.postNews= function(request, response){
    if(!request.body) return response.sendStatus(400)
    const newsName = request.body.name
    const newsText = request.body.text
    const newsImg = request.body.img
    const newsdisciplines = request.body.disciplines
    let d = new Date()
    var day = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    let date = year + "/" + month + "/" + day
    const news = new News({name: newsName, text: newsText, img:newsImg, disciplines:newsdisciplines, date:date})
     
    news.save(function(err){
        if(err) return console.log(err)
        response.redirect("admin/newsList")
    })
}
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

exports.dis = function(request, response){
    const dis = request.params["dis"];
 
    News.find({disciplines:dis}).populate('disciplines').exec(function (err, news) {
        if (err) return console.log(err)
        response.render("news",{
          news,
          disciplin:news.disciplin,
          
          isNews:true
         })
      })
}


