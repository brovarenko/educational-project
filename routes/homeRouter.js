const homeController = require("../controllers/homeController.js");
const express = require("express");
const homeRouter = express.Router();
const validate = require('../middleware/validate.js')
const authMiddleware = require('../middleware/authmiddleware')


homeRouter.get("/contacts", homeController.contacts);


//homeRouter.post('/post', validate.requireTitle , validate.requireTitleLengthAbove(5), homeController.submit)



  module.exports = homeRouter;