const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const disciplines = new Schema({
    name:{type:String,required:true},
    img: String

});
module.exports = mongoose.model("Disciplines", disciplines);