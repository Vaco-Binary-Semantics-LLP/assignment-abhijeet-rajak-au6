const PlayerModel = require("../model/Player");
const TeamModel = require("../model/Team");
const Response = require("../utils/responseHandler");
const AppError = require("../utils/appErrorHandler");
const mongoose = require("mongoose");
module.exports = {

    async createPlayer(req, res, next){
        let session = await mongoose.startSession();
        session.startTransaction();
        try{
            let payload = {
                name:req.body.name,
                team:req.params.team_id
            }
            if (!mongoose.Types.ObjectId.isValid(req.params.team_id))
                throw new AppError("Invalid team id", 400);

            
            const player = await PlayerModel.create([payload], {session});
            // console.log(player);
            const team = await TeamModel.updateOne({_id:req.params.team_id},{$push:{list_of_players:player[0]._id}}, {session});
            // console.log(team);
            await session.commitTransaction();

            req.locals = new Response("player sucessfully added to a team", 201, {player});
            next();
            
        }catch(err){
            await session.abortTransaction();
            next(new AppError(err.message, err.statusCode || 500));
        }
    },
    async removePlayer(req, _ , next){
        let session = await mongoose.startSession();
        session.startTransaction();
        try{
            if (!mongoose.Types.ObjectId.isValid(req.params.player_id))
                throw new AppError("Invalid player id", 400);
            const player = await PlayerModel.findByIdAndDelete(req.params.player_id, {session});
            // console.log(player);
            if(player!==null){
                await TeamModel.updateOne({},{$pull:{list_of_players:player._id}}, {session});
                await session.commitTransaction();
                req.locals = new Response("player sucessfully deleted", 201, {player});
            }else{
                req.locals = new Response("Player not found", 404);
            }
            
            next();
        }catch(err){
            await session.abortTransaction();
            next(new AppError(err.message, err.statusCode || 500));
        }
    },

    async getAllPlayers(req, _, next){
        try{
            let players;
            // console.log(req.query);
            if(req.query.name==='undefined'){
                players = await PlayerModel.find().populate("team", ["name"]);
            }else{
                players = await PlayerModel.find({name:req.query.name}).populate("team", ["name"]);
            }
            // console.log(players)
            req.locals = new Response("All Players", 201, {players});
            next();
        }catch(err){
            next(new AppError(err.message, err.statusCode || 500));
        }
    },
    async getPlayers(req,_,next){
        try{
            if (!mongoose.Types.ObjectId.isValid(req.params.team_id))
                throw new AppError("Invalid team id", 400);

            const teamPlayers = await PlayerModel.find({team:req.params.team_id});

            req.locals = new Response("All Players", 201, {teamPlayers});
            next();
        }catch(err){
            next(new AppError(err.message, err.statusCode || 500));
        }
    }
}