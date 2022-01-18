const mongoose = require("mongoose")
 
const Schema = mongoose.Schema
// установка схемы
const achievements = new Schema({
    disciplin: {type: Schema.Types.ObjectId, required:true, ref:'Disciplines'},
    place:Number,
    tournament:String,
    date:String,
    earning:Number

})
module.exports = mongoose.model("Achievements", achievements);