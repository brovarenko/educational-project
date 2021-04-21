const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const postScheme = new Schema({
    title: String,
    body: String,
    username:String

});
module.exports = mongoose.model("Post", postScheme);