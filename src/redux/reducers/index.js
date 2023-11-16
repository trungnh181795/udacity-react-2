import { combineReducers } from "redux";
import authReducer from './auth-reducer';
import userReducer from './user-reducer';
import questionsReducer from './question-reducer';

export default combineReducers({
    authedUser: authReducer,
    users: userReducer,
    questions: questionsReducer,
});