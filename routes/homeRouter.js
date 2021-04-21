const homeController = require("../controllers/homeController.js");
const express = require("express");
const homeRouter = express.Router();
const validate = require('../middleware/validate.js')


homeRouter.get("/", homeController.index);
homeRouter.get('/post',  homeController.form)
homeRouter.post('/post', validate.requireTitle ,validate.requireTitleLengthAbove(5), homeController.submit)
homeRouter.get("/postlist", homeController.getPost);


  module.exports = homeRouter;