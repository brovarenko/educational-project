const newsController = require("../controllers/newsController.js");
const express = require("express");
const newsRouter = express.Router();

const disciplinesController = require("../controllers/disciplinesController.js"); 
const rolemiddleware = require('../middleware/rolemiddleware')


//rolemiddleware(['Admin'])
newsRouter.use("/sort/:dis", newsController.dis);

newsRouter.use("/delete/:id", newsController.deletePost);
newsRouter.use("/post/:id", newsController.getPost);
newsRouter.use("/postnews", newsController.postNews);
newsRouter.use("/create", newsController.addNews);
newsRouter.use("/",newsController.getNews);




  module.exports = newsRouter;