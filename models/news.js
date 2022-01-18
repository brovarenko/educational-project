const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newsScheme = new Schema({
    name: {type:String,required:true},
    text: String,
    img: String,
    disciplines: {type: Schema.Types.ObjectId, ref:'Disciplines'},
    date: String,
    
})
module.exports = mongoose.model("News", newsScheme);