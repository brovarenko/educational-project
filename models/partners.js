const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const partnersScheme = new Schema({
    name: {type:String,required:true},
    description: String,
    img: String,
    url:String,
    organization: {type: Schema.Types.ObjectId, ref:'Organization'}
    
})
module.exports = mongoose.model("Partners", partnersScheme);