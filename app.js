
const express = require("express");
const exphbs = require("express-handlebars");
const newsRouter = require("./routes/newsRouter.js");
const teamsRouter = require("./routes/teamsRouter.js");
const homeRouter = require("./routes/homeRouter.js");
const adminRouter = require("./routes/adminRouter.js");
const achievementsRouter = require("./routes/achievementsRouter.js");
const partnersRouter = require("./routes/partnersRouter.js");
const multer  = require("multer");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const matchesRouter = require("./routes/matchesRouter.js");
const authRouter = require("./routes/authRouter.js");
const rolemiddleware = require('./middleware/rolemiddleware')
const fs = require('fs');
const app = express();

app.use(cookieParser('secret key'))

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' &&
  req.query.test === '1';
  next();
 });

app.get('/about', function(req, res) {
  res.render('index', {
    title:'about',
  pageTestScript: '/qa/tests-about.js'
  });
 });
 
//  fs.readdir('/public/img', (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   })
// })

 
 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter)
app.use("/matches", matchesRouter)
app.use("/news", newsRouter)
app.use("/admin",rolemiddleware(['Admin']) ,adminRouter)
app.use("/team", teamsRouter)
app.use("/achievements", achievementsRouter)
app.use("/partners", partnersRouter)
app.use("/", homeRouter)


const hbs = exphbs.create({
  defaultLayout:'layout',
  extname:'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs',hbs.engine)
app.set("view engine", "hbs")
app.set('views','views')

app.use(express.static(__dirname + '/public'))

app.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.render('logout')
  
})
app.get('/load', (req, res) => {
  res.render('load')
})
const fileFilter = (req, file, cb) => {
  
  if(file.mimetype === "image/png" || 
  file.mimetype === "image/jpg"|| 
  file.mimetype === "image/jpeg"){
      cb(null, true);
  }
  else{
      cb(null, false);
  }
}
app.use(multer({dest:"public/img",fileFilter: fileFilter}).single("filedata"))
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file
    console.log(filedata)
    if(!filedata)
       // res.render("load",{msg:'File downloaded'})
       return next(err)
    else
        res.render("load",{msg:'File downloaded'})
});

app.use(function (req, res, next) {
  res.status(404).send("Not Found")
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err.stack);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const start = async() => {
  await mongoose.connect("mongodb+srv://brrov:1q2w3e4r@cluster0.fsf3o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
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
}
start()


module.exports = app