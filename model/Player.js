const { Schema, model } = require("mongoose");

const playerSchema = Schema({
    name:{
        type:String,
        required:[true, "please provide player name"]
    },
    team:{
        type:Schema.Types.ObjectId,
        ref:"team"
    }
});


const playerModel = model("player",playerSchema);

module.exports = playerModel;