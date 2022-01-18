const express = require("express");
const achievementsRouter = express.Router();
const achievementsController = require("../controllers/achievementsController.js");


achievementsRouter.use("/sort/:dis", achievementsController.dis);
achievementsRouter.use("/postAchievements", achievementsController.postAchievements);
achievementsRouter.use("/delete/:id", achievementsController.deleteAchievements);
achievementsRouter.use("/create", achievementsController.addAchievements)
achievementsRouter.get("/", achievementsController.getAchievements)



module.exports = achievementsRouter;