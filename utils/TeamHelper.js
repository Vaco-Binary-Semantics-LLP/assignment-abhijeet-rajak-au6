const AppError = require("../utils/appErrorHandler");
class Team{

    constructor(){}
    async createTeam(Model, payload){
        try{
            return Model.create({...payload});
        }catch(error){
            throw new AppError(error.message, 500);
        }
    }
}

const team = new Team();
console.log(team);
module.exports = team;