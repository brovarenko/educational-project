
const express = require("express");
const exphbs = require("express-handlebars");
const newsRouter = require("./routes/newsRouter.js");
const homeRouter = require("./routes/homeRouter.js");
const mongoose = require("mongoose");

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const userRouter = require("./routes/userRouter.js");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/news", newsRouter);
app.use("/", homeRouter);

const hbs = exphbs.create({
  defaultLayout:'layout',
  extname:'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('hbs',hbs.engine)
app.set("view engine", "hbs");
app.set('views','views')

app.use(express.static(__dirname + '/public'));


app.use(function (req, res, next) {
  res.status(404).send("Not Found")
});

mongoose.connect("mongodb+srv://brrov:1q2w3e4r@cluster0.fsf3o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
{ 
  useUnifiedTopology: true ,
  useNewUrlParser:true,
  useFindAndModify: false
}, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});



