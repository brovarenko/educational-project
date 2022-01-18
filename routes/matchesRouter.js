const express = require("express");
const matchesController = require("../controllers/matchesController.js");
const matchesRouter = express.Router();

matchesRouter.use("/sort/:dis", matchesController.dis);

matchesRouter.use("/history/:team", matchesController.history);
matchesRouter.use("/match/:id/:team/:disciplines", matchesController.getMatch);
matchesRouter.use("/past", matchesController.past);
matchesRouter.use("/f", matchesController.f);
matchesRouter.use("/delete/:id", matchesController.deleteMatch);
matchesRouter.use("/postmatch", matchesController.postMatches);
matchesRouter.use("/updateScore", matchesController.updateScore);
matchesRouter.use("/updateScoreForm", matchesController.updateScoreForm);
matchesRouter.use("/create", matchesController.addMatches);
matchesRouter.use("/", matchesController.getMatches);


module.exports = matchesRouter;