import { GET_ALL_TEAMS } from '../Action';

const initialState = {
    teams:null,
    loading:false
  };
  
  const teamReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_TEAMS:
        return {
          ...state,teams:payload
        }
      case "SET_LOADING":
          return {
              ...state,loading:!state.loading
          }
      default: {
        return state;
      }
    }
  };
  
  export default teamReducer;