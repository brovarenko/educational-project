const Disciplines = require('../models/disciplines.js')
const { body,validationResult } = require('express-validator')



exports.addDisciplines=(req,res)=>{
    res.status(200).render('createDisciplines')
}

exports.updateDisciplin=(req,res,next)=>{
  Disciplines.find().exec( function(err, discipline){
 
    if (err) return next(err);
    res.render('updateDisciplin',{discipline:discipline})
});
 
 
}

exports.submit =[ 
    body('name', 'Discipline name required').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
    const name = req.body.name;
    const img = req.body.img;
    const errors = validationResult(req);
    const disciplines = new Disciplines({
    name: name,
    img:img
    
    })

    if (!errors.isEmpty()) {
        res.render('createDisciplines', { title: 'Create Discipline', disciplines: disciplines, errors: errors.array()});
        return;
      }
      else {
        
        Disciplines.findOne({ 'name': req.body.name })
          .exec( function(err, found_discipline) {
             if (err) { return next(err); }
  
             if (found_discipline) {
               
               res.redirect("/admin/disciplinesList");
             }
             else {
    disciplines.save((err) => {
    if (err) return next(err);
    res.status(201).redirect('/admin/disciplinesList') 
    })
  }
})
 } 
}
]
    
exports.deleteDisciplin = function(request, response){
    const id = request.params.id;
    Disciplines.findByIdAndDelete(id, function(err){
 
       if(err) {
        if (err) return next(err);
       }
       response.redirect('/admin/disciplinesList')
   })
} 
exports.postDisciplin =[ 
  body('name', 'Discipline name required').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
  const name = req.body.name;
  const img = req.body.img;
  const id = req.body.id;
  console.log(name)
  const errors = validationResult(req);
  

  if (!errors.isEmpty()) {
    Disciplines.find({}, function(err, discipline){
  
      if(err) {
          console.log(err)
           return next(err)
      }
      res.render('updateDisciplin', { title: 'Update Discipline', discipline: discipline, errors: errors.array()});
      return;
  })
      
    }
    else {
      Disciplines.updateOne({_id:id}, {name: name, img:img }, function(err, result){

        if (err) return next(err);
        
        res.redirect('/admin/disciplinesList')
    })
} 
}
]


