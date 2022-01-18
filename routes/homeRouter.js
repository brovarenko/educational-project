const homeController = require("../controllers/homeController.js");
const express = require("express");
const homeRouter = express.Router();
const newsController = require("../controllers/newsController.js");

homeRouter.get("/contacts", homeController.contacts);
homeRouter.get("/", newsController.getNews);


  module.exports = homeRouter;