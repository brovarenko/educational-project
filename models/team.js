const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const teamScheme = new Schema({
    disciplin: {type: Schema.Types.ObjectId, ref:"Disciplines"},
    player: [{type: Schema.Types.ObjectId, ref:'Player'}],
    organization: {type: Schema.Types.ObjectId, ref:'Organization'}
});
module.exports = mongoose.model("Team", teamScheme);