const partnersController = require("../controllers/partnersController.js");
const express = require("express");
const partnersRouter = express.Router();

const disciplinesController = require("../controllers/disciplinesController.js"); 
const rolemiddleware = require('../middleware/rolemiddleware')


//rolemiddleware(['Admin'])



partnersRouter.use("/deletePartners/:id", partnersController.deletePartners);

partnersRouter.post("/postPartners", partnersController.postPartners);
partnersRouter.get("/createPartners", partnersController.addPartners);
partnersRouter.get("/", partnersController.getPartners);




  module.exports = partnersRouter;