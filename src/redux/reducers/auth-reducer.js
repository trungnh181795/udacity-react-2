import { LOGOUT_AUTHED_USER, SET_AUTHED_USER } from "../constants/auth-constants";

const authReducer = (state = null, action) => {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.authedUser;
        case LOGOUT_AUTHED_USER:
            return null;
        default:
            return state;
    }
}

export default authReducer