const jwt = require("jsonwebtoken")



module.exports = function(req,res,next){
    if(req.method ==="OPTIONS"){
        next()
    }

try{
    
    const token = req.cookies.token
    
    
    if(!token){
        return res.status(403).json({message:"User is not logged in"})
    }
    const decodedData = jwt.verify(token,"secret")
    req.user = decodedData
    next()
} catch (e) {
    console.log(e)
        return res.status(403).json({message:"Error"})
    }

}