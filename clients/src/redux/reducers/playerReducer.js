import { GET_ALL_PLAYERS } from '../Action';

const initialState = {
    players:null,
    loading:false
  };
  
  const playerReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_PLAYERS:
        return {
          ...state,players:payload
        }
     case "PLAYER_LOADING":
        return {
            ...state, loading:!state.loading
        }
      default: {
        return state;
      }
    }
  };
  
  export default playerReducer;