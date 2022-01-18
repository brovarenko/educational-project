const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const organizationScheme = new Schema({
    name: {type:String,required:true},
    img: String
})
module.exports = mongoose.model("Organization", organizationScheme);