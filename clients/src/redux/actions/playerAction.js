import {GET_ALL_PLAYERS, GET_ALL_TEAMS} from '../Action';
import axios from 'axios';
export const getAllPlayers=(team_id)=>async(dispatch)=>{

    try{
        dispatch({
            type:"PLAYER_LOADING",
        })
        console.log(team_id);
        const {data} = await axios.get("http://localhost:1234/player/"+team_id);
        console.log(data);
        dispatch({
            type:GET_ALL_PLAYERS,
            payload:data.teamPlayers
        })
    }catch(err){
        console.log(err);
    }
    finally{
        dispatch({
            type:"PLAYER_LOADING",
        })
    }
}

export const delPlayer=(player_id)=>async(dispatch)=>{
    try{
        let {data} = await axios.delete("http://localhost:1234/player/"+player_id);
        dispatch({
            type:"SET_LOADING",
        })
        let response = await axios.get("http://localhost:1234/team");
        dispatch({
            type:GET_ALL_TEAMS,
            payload:response.data.teams
        })
    }catch(err){
        console.log(err);
    }finally{
        dispatch({
            type:"SET_LOADING",
        })
    }
}

export const addPlayerToTeam=(team_id, payload)=>async(dispatch)=>{
    try{
        let {data} = await axios.post("http://localhost:1234/player/"+team_id, {...payload});
        dispatch({
            type:"SET_LOADING",
        })
        let response = await axios.get("http://localhost:1234/team");
        dispatch({
            type:GET_ALL_TEAMS,
            payload:response.data.teams
        })
    }catch(err){
        console.log(err);
    }finally{
        dispatch({
            type:"SET_LOADING",
        })
    }
}


export const getAllPlayerTeam=(name)=>async(dispatch)=>{
    console.log(name);
    try{
        let {data} = await axios.get(`http://localhost:1234/player/?name=${name}`);
        dispatch({
            type:"SET_LOADING",
        })
        // console.log(data);
        dispatch({
            type:GET_ALL_PLAYERS,
            payload:data.players
        })
    }catch(err){
        console.log(err);
    }finally{
        dispatch({
            type:"SET_LOADING",
        })
    }
}