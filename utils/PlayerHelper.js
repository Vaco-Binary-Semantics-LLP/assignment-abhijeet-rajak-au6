
const AppError = require("../utils/appErrorHandler");
class Player{

    constructor(){}
    async createPlayer(Model, payload){
        try{
            return Model.create({...payload});
        }catch(error){
            throw new AppError(error.message, 500);
        }
    }
}

const player = new Player();
module.exports = player;

