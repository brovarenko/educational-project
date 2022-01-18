const jwt = require("jsonwebtoken")

module.exports = function(roles){
     return function(req,res,next){
    if(req.method ==="OPTIONS"){
        next()
    }

    try{
    const token = req.cookies.token
    if(!token){
        return res.status(403).render('Error',{message:"User is not logged in"})
    }
    const {roles:userRoles} = jwt.verify(token,"secret")
    let hasRole = false
    userRoles.forEach(role=>{
        if(roles.includes(role)){
            hasRole= true
        }
    })
    if(!hasRole){
        return res.status(403).render('Error',{message:"No accsess"})
    }
    next()
    
    } catch (e) {
    console.log(e)
    return res.status(403).render('Error',{message:"Error"})
    }

}
}