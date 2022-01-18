var async = require('async');
const Achievements = require('../models/achievements.js')
const Disciplines = require('../models/disciplines.js')
exports.getAchievements = function(req, res, next){

    async.parallel({
        achievements: function(callback) {
            Achievements.find({}).populate('disciplin').exec(callback)
                
            
        }, count: function(callback) {
            Achievements.countDocuments({}, callback);
        },
         count_1: function(callback) {
            Achievements.countDocuments({place:1}, callback);
        },count_2: function(callback) {
            Achievements.countDocuments({place:2}, callback);
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('achievements', { title: 'Achievements', achievements:results.achievements, isAchievements:true, disciplin:results.disciplines,data:results });
    });
    
  
     
}

exports.postAchievements= function(request, response){
    if(!request.body) return response.sendStatus(400);
    const disciplin = request.body.disciplin;
    const place = request.body.place;
    const tournament = request.body.tournament 
    const earning = request.body.earning
    const date = request.body.date
    let d = new Date(date)
    var day = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    
    let dat = year + "/" + month + "/" + day 

    const achievement = new Achievements({place: place, date: dat, disciplin:disciplin,tournament:tournament,earning:earning});
  
   
    achievement.save(function(err){
        if(err) return console.log(err);
        response.redirect("/admin/achievementsList");
        console.log(date)
    })
}

exports.addAchievements = function (req, res){
    Disciplines.find({}, function(err, disciplines){
  
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
        
        res.render("createAchievements", {
           
            disciplines:disciplines
            
        })
        
    })
    
        
    
}

exports.deleteAchievements = function(request, response){
    const id = request.params.id;
    Achievements.findByIdAndDelete(id, function(err, allNews){
 
       if(err) {
           console.log(err);
           return response.sendStatus(400);
       }
       response.redirect('/admin/achievementsList')
   });
};

exports.dis = function(request, response){
    const dis = request.params["dis"];
 
    Achievements.find({disciplin:dis}).populate('disciplin').exec(function (err, achievements) {
        if (err) return console.log(err)
        console.log(dis)
        response.render("achievements",{
            achievements,
          disciplin:achievements.disciplin,
          
          isAchievements:true
         })
      })
}
