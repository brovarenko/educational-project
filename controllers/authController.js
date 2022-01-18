const User = require("../models/user.js")
const Role = require("../models/role.js")
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const generateAccessToken = (id,roles)=>{
    const payload={
        id,
        roles
    }
    return jwt.sign(payload,"secret",{expiresIn:"10h"})
}
class authController{

    async register(req,res){
        try{
            const errors = validationResult(req)
        if (!errors.isEmpty()){
            res.render('register', { title : 'Register',message:'RIncorrect data' })
            return
        }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate){ res.render('register', { title : 'Register', message:"User is exsist" })
            return
        }
             
            const hashedPassword = await bcrypt.hash(password,12)
            const userRole = await Role.findOne({value:"Admin"})
            const user = new User({email:email, password:hashedPassword, roles:[userRole.value]})
            await user.save()
            res.render('register', { title : 'Register', message:'User created' })
            
        } catch (e){
            console.log(e)
            
            res.render('register', { title : 'Register',message:'Registration error' })
        } 
    }
    async login(req,res){
        try{
            const {email,password} = req.body
            const user = await User.findOne({email})
            if(!user){
                res.render('login', { title : 'Login',message:"This email does not exist" })
                return
            }
            const validPassword = bcrypt.compareSync(password,user.password)
            if(!validPassword){
                res.render('login', { title : 'Login',message:"Uncorrect password" })
                return
               
            }
            const token = generateAccessToken(user._id,user.roles)
            res.cookie('token', token, { httpOnly: true })
            res.render("index",{isHome:true})
           
            
        } catch (e){
            console.log(e)
            res.render('login', { title : 'Login', message:"Error" })
            return
        }
    }
    async getUsers(req,res){
        User.find({}, function(err, user){
  
            if(err) {
                console.log(err)
                 return next(err)
            }
            res.status(200).render("users", {
                user
            })
        })
    }
    RegisterForm = (req, res) => {
        res.render('register', { title : 'Register' })
        };

    LoginForm = (req, res) => {
            res.render('login', { title : 'Login' })
            };

    deleteUser = (request, response)=>{
    const id = request.params.id;
    User.findByIdAndDelete(id, function(err){
 
       if(err) {
         return next(err)
       }
       response.redirect('/auth/getuser')
   })
}
} 

module.exports = new authController()