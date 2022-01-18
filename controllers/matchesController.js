const Matches = require("../models/matches.js")
const Disciplines = require("../models/disciplines.js")
const Team = require("../models/team.js")
const { body,validationResult } = require('express-validator')
var async = require('async')
exports.addMatches = function (req, res){
    async.parallel({
        teams: function(callback) {
            Team.find({}).populate('organization').populate('disciplin').exec(callback)
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback)
        },
    }, function(err, results) {
        if (err) { return next(err) }
        res.render('createMatch', { title: 'Add match', teams: results.teams, disciplines:results.disciplines })
    })
    
        
    
}
exports.getMatches = function(req, res){
    async.parallel({
        matches: function(callback) {
            Matches.find({}).populate('disciplines').populate({path:'teams',populate:{path:'organization'}}).exec(callback)
                
            
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        const wins = results.matches
        res.render('matches', { title: 'Matches', match:results.matches, isUsers:true, disciplin:results.disciplines })
    })

    
}
exports.postMatches= function(request, response){
    if(!request.body) return response.sendStatus(400)
    const name = request.body.name
    const date = request.body.date
    const team1 = request.body.team1 
    const team2 = request.body.team2
    const score1 = request.body.score1
    const score2 = request.body.score2
    const disciplines = request.body.disciplines
    let d = new Date(date)
    var day = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    var hour = d.getHours()
    var m = d.getUTCMinutes()
    let dat = year + "." + month + "." + day + "  " + hour + ":" + m

    const match = new Matches({name: name, date: dat,disciplines:disciplines,teams:[team1,team2],score:[score1,score2]})
  
   
    match.save(function(err){
        if(err) return console.log(err)
        response.redirect("/admin/matchesList")
        console.log(date)
    })
}

exports.getMatch = function(req, res,next){
    const id = req.params.id
    const team = req.params.team
    const discipline = req.params.disciplines
    
   
    async.parallel({
    
        matches: function(callback) {
            Matches.findById(id).populate('disciplines').populate({path:'teams',populate:{path:'organization'}}).populate({path:'teams',populate:{path:'player'}}).exec(callback)
                
            
        },
       
         win: function(callback) {
           
            Matches.countDocuments( {'isWin':true,'teams.1':team,isPast:true,disciplines:discipline}).populate('teams').exec(callback)
         },
        draw: function(callback) {
           
            Matches.countDocuments( {'isDrow':true, 'teams.1':team,isPast:true,disciplines:discipline}).populate('teams').exec(callback)
         },
         count: function(callback) {
            
            Matches.countDocuments( {'teams.1':team,disciplines:discipline,isPast:true }).populate('disciplines').populate('teams').exec(callback)
         },
       //function() {return this.score[0] = 0}
    }, function(err, results) {
        if (err) { return console.log(err); }
     
       const win = results.win / results.count * 100
       const draw = results.draw / results.count * 100
       const defeat = 100 - win
       console.log(draw)
        res.render('match', { title: 'Matches', match:results.matches, isUsers:true , win:win, draw:draw, count:results.count, defeat:defeat})
    })

    
}

var mongoose = require('mongoose')
exports.history = function(req, res){
    const id = req.params["team"]
    async.parallel({
        matches: function(callback) {
            Matches.find({teams:mongoose.Types.ObjectId(id) }).populate('disciplines').populate({path:'teams',populate:{path:'organization'}}).exec(callback)
                
            
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
       
        res.render('history', { title: 'History', match:results.matches, isUsers:true, disciplin:results.disciplines })
    })
    
}

exports.deleteMatch = function(request, response){
    const id = request.params.id
    Matches.findByIdAndDelete(id, function(err, allNews){
 
       if(err) {
           console.log(err);
           return response.sendStatus(400);
       }
       response.redirect('/admin/matchesList')
   });
};

exports.dis = function(req, res){
    const dis = req.params["dis"]
    async.parallel({
        matches: function(callback) {
            Matches.find({disciplines:dis}).populate('disciplines').populate({path:'teams',populate:{path:'organization'}}).exec(callback)
                
            
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
       
        res.render('matches', { title: 'Matches', match:results.matches, isUsers:true, disciplin:results.disciplines })
    })
    
}

exports.updateScoreForm = function(req, res,next){
     
    Matches.find({}, function(err, matches){
  
        if(err) return next(err)
        
        res.render("updateScore", {
            matches
        })
    })
}

exports.updateScore =[ 
    body('score1', 'Score 1 required').trim().isLength({ min: 1 }).escape(),
    body('score2', 'Score 2 required').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const id = req.body.id
        const score1 = req.body.score1
        const score2 = req.body.score2
    console.log(score2,score2)
    const errors = validationResult(req);
    
  
    if (!errors.isEmpty()) {
        Matches.find({}, function(err, discipline){
    
        if(err) {
            console.log(err)
             return next(err)
        }
        res.render('updateScore', { title: 'Update Score', matches: discipline, errors: errors.array()});
        return;
    })
        
      }
      else {
        
        
        Matches.updateOne({_id:id}, {score:[score1,score2]}, function(err, result){
  
            if (err) return next(err);
            
            res.redirect('/admin/matchesList')
        })
  } 
  }
  ]

  exports.past = function(req, res){
    
    async.parallel({
        matches: function(callback) {
            Matches.find({isPast:true}).populate('disciplines').populate({path:'teams',populate:{path:'organization'}}).exec(callback)
                
            
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
       
        res.render('matches', { title: 'Matches', match:results.matches, isUsers:true, disciplin:results.disciplines })
    })
    
}
exports.f = function(req, res){
    
    async.parallel({
        matches: function(callback) {
            Matches.find({isPast:false}).populate('disciplines').populate({path:'teams',populate:{path:'organization'}}).exec(callback)
                
            
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
       
        res.render('matches', { title: 'Matches', match:results.matches, isUsers:true, disciplin:results.disciplines })
    })
    
}
