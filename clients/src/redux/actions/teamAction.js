import {GET_ALL_TEAMS} from '../Action';

import axios from 'axios';

export const getAllTeams=()=>async(dispatch)=>{

    try{
        dispatch({
            type:"SET_LOADING",
        })
        const {data} = await axios.get("http://localhost:1234/team");
        dispatch({
            type:GET_ALL_TEAMS,
            payload:data.teams
        })
    }catch(err){
        console.log(err);
    }
    finally{
        dispatch({
            type:"SET_LOADING",
        })
    }
}

export const delTeam=(team_id)=>async(dispatch)=>{

    try{
        dispatch({
            type:"SET_LOADING",
        })
        const {data} = await axios.delete("http://localhost:1234/team/"+team_id);
        const response = await axios.get("http://localhost:1234/team");
        dispatch({
            type:GET_ALL_TEAMS,
            payload:response.data.teams
        })
    }catch(err){
        console.log(err);
    }
    finally{
        dispatch({
            type:"SET_LOADING",
        })
    }
}

export const addTeamName=(payload)=>async(dispatch)=>{

    try{
        dispatch({
            type:"SET_LOADING",
        })
        const {data} = await axios.post("http://localhost:1234/team/", {...payload});
        const response = await axios.get("http://localhost:1234/team");
        dispatch({
            type:GET_ALL_TEAMS,
            payload:response.data.teams
        })
    }catch(err){
        console.log(err);
    }
    finally{
        dispatch({
            type:"SET_LOADING",
        })
    }
}