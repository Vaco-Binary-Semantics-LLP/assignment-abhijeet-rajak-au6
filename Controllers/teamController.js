const TeamModel = require("../model/Team");
const PlayerModel = require("../model/Player");
const Team = require("../utils/TeamHelper");
const Response = require("../utils/responseHandler");
const AppError = require("../utils/appErrorHandler");
const mongoose = require("mongoose");
module.exports = {

    async createTeam(req, _, next){
        // console.log(req.body);
        try{
            let payload = {name:req.body.name, list_of_players:[]};
            const player = await TeamModel.create(payload);
            // console.log(player);
            if(!player)
                throw new AppError("Problem in craeting the team");
            req.locals = new Response("team created sucessfully", 201);
            next();
            
        }catch(err){
            next(new AppError(err.message, err.statusCode));
        }
    },

    async getAllTeam(req,_,next){
        try{
            const teams = await TeamModel.find().populate("list_of_players").select({name:1});
            // console.log(teams);
            req.locals = new Response("All teams", 200, {teams});
            next();
        }catch(err){
            next(new AppError(err.message, err.statusCode));
        }
    },

    async removeTeam(req, _, next){

        let session = await mongoose.startSession();
        session.startTransaction();
        try{    
            const deleteTeam = await TeamModel.findByIdAndDelete(req.params.team_id, {session});
            await PlayerModel.updateMany({team:deleteTeam._id}, {team:null}, {session});
            await session.commitTransaction();
            // console.log(deleteTeam);
            req.locals = new Response("Deleted sucessfully", 200, {deleteTeam});
            next();
        }catch(err){
            await session.abortTransaction();
            next(new AppError(err.message, err.statusCode || 500));
        }
    }
}