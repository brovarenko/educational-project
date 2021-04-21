const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const newsScheme = new Schema({
    name: String,
    text: String
});
module.exports = mongoose.model("News", newsScheme);