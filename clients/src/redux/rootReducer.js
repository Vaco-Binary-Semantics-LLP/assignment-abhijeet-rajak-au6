
import { combineReducers } from 'redux';
import playerReducer from '../redux/reducers/playerReducer';
import teamReducer from '../redux/reducers/teamReducer';

const rootReducer = combineReducers({
    playerState:playerReducer,
    teamState:teamReducer
});

export default rootReducer;