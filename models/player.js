const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const palyerScheme = new Schema({
    name: String,
    biography: String,
    settings:String,
    img:String,
    disciplin: {type: Schema.Types.ObjectId, ref:'Disciplines'},
    country: String,
    role:String


})

module.exports = mongoose.model("Player",  palyerScheme);