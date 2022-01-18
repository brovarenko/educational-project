const Player = require('../models/player.js')
const Disciplines = require('../models/disciplines.js')
const { body,validationResult } = require('express-validator');
exports.addPlayer = function (request, response){
    Disciplines.find({}, function(err, disciplines){
  
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
        
        response.render("createPlayer", {
           
            disciplines
            
        })
        
    })
}
exports.getPlayer = function(request, response){
     
    Player.find({}, function(err, player){
  
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("player", {
            player
        })
    })
}
exports.postPlayer=[
body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),

 function(request, response){
    const errors = validationResult(request);
    const name = request.body.name
    const biography = request.body.biography
    const settings = request.body.settings
    const team = request.body.team
    const img = request.body.img
    const disciplines = request.body.disciplines
    const role = request.body.role
    const country = request.body.country

    const player = new Player({name: name, biography:biography,settings:settings,team:team,img:img,disciplin:disciplines,country:country,role:role })
   
    if (!errors.isEmpty()) {
    Disciplines.find({}, function(err, disciplines){
  
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
        console.log(player);
        response.render("createPlayer", {
           
            disciplines,player:player,errors: errors.array()
            
        })
        
    })
    return
}
else {
    player.save(function(err){
        if(err) return console.log(err);
        response.redirect("/admin/playersList");
    });
    }
}
]