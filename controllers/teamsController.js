const Team = require("../models/team.js");
const Disciplines = require("../models/disciplines.js");
const Player = require("../models/player.js");
const Organization = require("../models/organization.js");
var async = require('async');

exports.addTeams = function (req, res){
    async.parallel({
        org: function(callback) {
            Organization.find({}, callback);
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback);
        },
        
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('createTeam', { title: 'Create team', org: results.org, disciplines:results.disciplines});
    });
    
}

exports.getTeams = function(request, response){
     
    Team.find({organization : "60bed016901e213174ccc4ec"}).populate('disciplin').populate('organization').exec(function (err, team) {
        if (err) { return next(err); }
      
        response.render("team", {title:"Teams",
          team,
          
          isTeam:true
         })
      })
      
    
}
exports.postTeams= function(request, response, next){
    if(!request.body) return response.sendStatus(400)
    const org = request.body.org
    const disciplines = request.body.disciplines
    const team = new Team({organization: org, disciplin:disciplines})

    team.save(function(err){
        if (err) { return next(err); }
        response.redirect("/admin/teamsList");
    });
};

exports.postplayers= function(request, response,next){
    if(!request.body) return response.sendStatus(400)

    const player = request.body.player
    const disciplin = request.body.disciplin
    const team = request.body.team

    Team.findOneAndUpdate({disciplin:disciplin, organization:team}, {'$push': {player: player}}, function(err, team){
        
        
        if (err) { console.log(err); return next(err); }
        response.redirect("/admin/teamsList")
    })
    
    
    
};

exports.addPlayerToTeam = function (req, res, next){
    async.parallel({
        players: function(callback) {
            Player.find().populate('disciplin').exec(callback)
        },
        disciplines: function(callback) {
            Disciplines.find({}, callback);
        },
        team: function(callback) {
            Organization.find({}, callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('addPlayerToTeam', { title: 'Add player to team', players: results.players, disciplines:results.disciplines, team:results.team });
    });
   

}

exports.getPlayers = function(request, response){
    const id = request.params.id;
    
    
    var player = Player.findOne({name:'simple'})
    
    
    Team.findById(id).populate('player').exec(function (err, team) {
      if (err) return console.log(err)
      
      response.render("player",{
        team,
       play:team.player
       })
    })

    
} 
exports.deleteTeam = function(request, response){
    const id = request.params.id;
   Team.findByIdAndDelete(id, function(err, allNews){
    console.log(allNews)
       if(err) {
           console.log(err);
           return response.sendStatus(400);
       }
       response.redirect('/admin/teamsList')
   })
}

exports.deletePlayer = function(request, response){
    const id = request.params.id
    const idp = request.params.idp
    Team.findByIdAndUpdate(id, {$pull: { "player": idp}}, function(err, allNews){
        console.log(request.params.idp)
        console.log(request.params.id)
           if(err) {
               console.log(err);
               return response.sendStatus(400);
           }
           response.redirect('/admin/teamsList')
       })
    }

    exports.getPlayer = function(request, response){
        const id = request.params.id;
        
        
        Player.findById(id,function (err, player) {
          if (err) return console.log(err)
          
          response.render("playerinfo",{
            player
           
           })
        })
    
        
    } 
