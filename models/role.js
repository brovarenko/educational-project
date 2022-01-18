const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const Role = new Schema({
    value:{type:String, unique:true, required:true, default:'User'}
})


module.exports = mongoose.model('Role', Role)