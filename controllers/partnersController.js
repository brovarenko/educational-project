const Disciplines = require('../models/disciplines.js')
const Organization = require('../models/organization.js')
const Partners = require('../models/Partners.js')
const { body,validationResult } = require('express-validator');

exports.addPartners = function (request, response) {
    Organization.find({}, function(err, organizations){
      
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
        
        response.render("createPartners", {
           
            organizations
            
        })
        
    })
    
}

exports.postPartners =[ 
    body('name', 'Name required').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;
    const img = req.body.img;
    const organization = req.body.organization;

    const errors = validationResult(req);
    
    const partner = new Partners({
    name: name,
    description:description,
    url:url,
    img:img,
    organization:organization
    })

    if (!errors.isEmpty()) {
        Organization.find({}, function(err, organization){
      
            if(err) {
                console.log(err);
                return response.sendStatus(400);
            }
            
            res.render('createPartners', { title: 'Create Partners', partner: partner,organizations:organization, errors: errors.array()});
            
        })
        
        
        
        return;
      }
      else {
        
        Partners.findOne({ 'name': req.body.name })
          .exec( function(err, found) {
             if (err) { return next(err); }
  
             if (found) {
               
               res.redirect("/partner/partnerList");
             }
             else {
                partner.save((err) => {
    if (err) return next(err);
    res.redirect('/admin/partnersList') 
    })
    
  }
})
 } 
}
]

exports.deletePartners = function(request, response){
    const id = request.params.id;
    Partners.findByIdAndDelete(id, function(err, allNews){
       if(err) {
         return next(err);
       }
       response.redirect('/admin/partnersList')
   })
}

exports.getPartners = function(request, response){
     
    Partners.find({}, function(err, partners){
  
        if(err) {
            console.log(err)
             return next(err)
        }
        response.render("partners", {
            partners,title: 'Partners'
        })
    })
}