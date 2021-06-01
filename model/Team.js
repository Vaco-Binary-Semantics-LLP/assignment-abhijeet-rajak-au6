const { Schema, model } = require("mongoose");

const teamSchema = Schema({
    name:{
        type:String,
        required:[true, "please provide team name"]
    },
    list_of_players:[{
        type:Schema.Types.ObjectId,
        ref:"player"
    }]
});


const playerModel = model("team",teamSchema);

module.exports = playerModel;