const express = require("express");
const teamsController = require("../controllers/teamsController.js");
const playerController = require("../controllers/playerController.js");
const teamsRouter = express.Router();

teamsRouter.use("/postteam", teamsController.postTeams);
teamsRouter.use("/create", teamsController.addTeams);
teamsRouter.use("/createPlayer", playerController.addPlayer);
teamsRouter.use("/postplayer", playerController.postPlayer);
teamsRouter.use("/addplayertoteam", teamsController.addPlayerToTeam);
teamsRouter.use("/postplayers", teamsController.postplayers);
teamsRouter.use("/delete/:id", teamsController.deleteTeam);
teamsRouter.use("/players/:id/deleteplayer/:idp", teamsController.deletePlayer);
teamsRouter.use("/players/:id", teamsController.getPlayers);
teamsRouter.use("/player/:id", teamsController.getPlayer);

teamsRouter.use("/", teamsController.getTeams);


module.exports = teamsRouter;