const Player = require('../models/player.js')
const Disciplines = require('../models/disciplines.js')
const News = require('../models/news.js')
const Team = require("../models/team.js");
const Achievements = require("../models/achievements.js");
const Matches = require("../models/matches.js");
const Organization = require("../models/organization.js");
const Partners = require('../models/Partners.js')
var async = require('async')
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.getPlayers = function(request, response){
     
    Player.find({}).populate('disciplin').exec(function(err, player){
  
        if(err) {
            console.log(err)
             return next(err)
        }
        response.render("adminPlayers", {
            player,title: 'Players'
        })
    })
}


    exports.deletePlayer = function(request, response){
        const id = request.params.id;
       Player.findByIdAndDelete(id, function(err, allNews){
           if(err) {
               console.log(err);
               return response.sendStatus(400);
           }
           response.redirect('/admin/playersList')
       })
    }

    exports.updatePlayer= function(request, response){
        if(!request.body) return response.sendStatus(400)
        const id = request.body.id;
        const name = request.body.name
        const biography = request.body.biography
        const settings = request.body.settings
        const team = request.body.team
        const img = request.body.img
        const disciplines = request.body.disciplines
    console.log(name)
        Player.findByIdAndUpdate(id, {name: name, biography:biography,settings:settings,team:team,img:img,disciplin:disciplines }, function(err, result){
    
            if(err) return console.log(err);
            
            response.redirect('/admin/playersList')
        })
    }

    exports.Form = function (request, response){
        const id = request.params.id;
        Player.find({}, function(err, players){
      
            if(err) {
                console.log(err);
                return response.sendStatus(400);
            }
            
            response.render("updatePlayer", {
               
                players,title: 'Update player'
                
            })
            
        })
    }

    exports.getNews = function(request, response){
     
        News.find({}, function(err, news){
      
            if(err) {
                console.log(err);
                return response.sendStatus(400);
            }
            response.render("adminNews", {
                news,title: 'News admin'
            })
        })
    }

    exports.getTeams = function(request, response){
        Team.find({}).populate('disciplin').populate('player').populate('organization').exec(function (err, teams) {
            if (err) return console.log(err)
            
            response.render("adminTeams", {
              teams, title: 'Teams admin'
            
             })
          })
        }

        exports.getAchievements = function(request, response, next){


    
  
            Achievements.find({}).populate('disciplin').exec(function (err, achievements) {
                if (err) return console.log(err)
                
                response.render("adminAchievements", {
                    achievements, title: 'Achievements admin'
                
                 })
              })
            
        }

        
exports.getDisciplines = function (req, res){
    Disciplines.find({}, function(err, disciplines){
  
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
        
        res.render("disciplinesList", {
           
            disciplines:disciplines,title: 'Disciplines admin'
            
        })
        
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
        
        res.render('adminMatches', { title: 'Matches', match:results.matches, disciplin:results.disciplines })
    })
   
}

exports.index = function (request, response) {
    response.render("index.hbs",{isHome:true,title: 'Admin'});
};

exports.getOrganization = function(request, response){
     
    Organization.find({}, function(err, org){
  
        if(err) {
            console.log(err)
             return next(err)
        }
        response.render("adminOrg", {
            org, title: 'Organizations admin'
        })
    })
}

exports.addOrg = function (request, response) {
    response.render("createOrg",{title: 'Create organization'})
}

exports.postOrg =[ 
    body('name', 'Name required').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
    const name = req.body.name;
    const img = req.body.img;

    const errors = validationResult(req);
    
    const org = new Organization({
    name: name,
    img:img
    })

    if (!errors.isEmpty()) {
        
        res.render('createOrg', { title: 'Create Organization', org: org, errors: errors.array()});
        
        return;
      }
      else {
        
        Organization.findOne({ 'name': req.body.name })
          .exec( function(err, found) {
             if (err) { return next(err); }
  
             if (found) {
               
               res.redirect("/admin/orgList");
             }
             else {
            org.save((err) => {
    if (err) return next(err);
    res.redirect('/admin/orgList') 
    })
    
  }
})
 } 
}
]

exports.deleteOrg = function(request, response){
    const id = request.params.id;
   Organization.findByIdAndDelete(id, function(err, allNews){
       if(err) {
         return next(err);
       }
       response.redirect('/admin/orgList')
   })
}

exports.getPartners = function(request, response){
     
    Partners.find({}, function(err, partners){
  
        if(err) {
            console.log(err)
             return next(err)
        }
        response.render("adminPartners", {
            partners
        })
    })
}


exports.updateOrgForm = function(req, res,next){
     
    Organization.find({}, function(err, org){
  
        if(err) return next(err)
        
        res.render("updateOrganization", {
            org
        })
    })
}

exports.updateOrg =[ 
    body('name', 'Name required').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const id = req.body.id
        const name = req.body.name
        const img = req.body.img
    
    const errors = validationResult(req);
    
  
    if (!errors.isEmpty()) {
        Organization.find({}, function(err, org){
    
        if(err) {
            console.log(err)
             return next(err)
        }
        res.render('updateOrganization', { title: 'Update Org', org: org, errors: errors.array()});
        return;
    })
        
      }
      else { Organization.updateOne({_id:id}, {name: name, img:img }, function(err, result){

        if (err) return next(err);
        
        res.redirect('/admin/orgList')
    })
  } 
  }
  ]



 