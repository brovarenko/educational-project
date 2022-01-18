const disciplinesController = require("../controllers/disciplinesController.js");
const express = require("express");
const adminRouter = express.Router();
const teamsController = require("../controllers/teamsController.js");
const playerController = require("../controllers/playerController.js");
const adminController = require("../controllers/adminController.js");
const rolemiddleware = require('../middleware/rolemiddleware')


//rolemiddleware(['Admin'])
adminRouter.get("/createDisciplines",disciplinesController.addDisciplines)
adminRouter.use("/postDisciplines", disciplinesController.submit)


adminRouter.use("/updatePlayer", adminController.updatePlayer)
adminRouter.get("/playersList", adminController.getPlayers)
adminRouter.use("/deletePlayer/:id", adminController.deletePlayer)
adminRouter.get("/Form", adminController.Form)

adminRouter.get("/newsList", adminController.getNews)
adminRouter.get("/teamsList", adminController.getTeams)

adminRouter.get("/achievementsList", adminController.getAchievements)

adminRouter.get("/disciplinesList", adminController.getDisciplines)
adminRouter.use("/deleteDisciplin/:id", disciplinesController.deleteDisciplin)

adminRouter.get("/updateDisciplin", disciplinesController.updateDisciplin)
adminRouter.use("/postDisciplin", disciplinesController.postDisciplin)




adminRouter.get("/matchesList", adminController.getMatches)

adminRouter.get("/createOrg", adminController.addOrg)
adminRouter.get("/orgList", adminController.getOrganization)
adminRouter.post("/postOrg", adminController.postOrg)
adminRouter.get("/updateOrgForm", adminController.updateOrgForm)
adminRouter.use("/updateOrg", adminController.updateOrg)

adminRouter.use("/deleteOrg/:id", adminController.deleteOrg)

adminRouter.get("/partnersList", adminController.getPartners)

adminRouter.get("/", adminController.index)

  module.exports = adminRouter;