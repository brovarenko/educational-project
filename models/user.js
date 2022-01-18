const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const userScheme = new Schema({
    email:{type:String, unique:true, required:true},
    password: {type:String, required:true},
    roles:[{type:String, ref:'role'}]
});

module.exports = mongoose.model("User", userScheme);