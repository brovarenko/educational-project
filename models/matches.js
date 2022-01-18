const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const matches = new Schema({
    disciplines: {type: Schema.Types.ObjectId,required:true, ref:'Disciplines'},
    date: String,
    teams:[{type: Schema.Types.ObjectId, ref:'Team'}],
    name:String,
    score:[{type:Number}], 
    isWin: {type: Boolean, default: false},
    isDrow: {type: Boolean, default: false},
    isPast: {type: Boolean, default: false}
    

}).plugin(function(schema, options) {
    schema.pre('save', function(next) {
        this.isWin = (this.score[0] > this.score[1])
        this.isDrow = (this.score[0] == this.score[1])
        this.isPast = (this.score[0] !== null)
        next();
    })
})

module.exports = mongoose.model("Matches", matches);