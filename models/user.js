const mongoose = require("mongoose");
 const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
// установка схемы
const userScheme = new Schema({
    name: String,
    age: Number
});
module.exports = mongoose.model("User", userScheme);