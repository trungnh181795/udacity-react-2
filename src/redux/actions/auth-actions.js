import { LOGOUT_AUTHED_USER, SET_AUTHED_USER } from "../constants/auth-constants";

export const setAuthedUser = (authedUser) => {
    return {
        type: SET_AUTHED_USER,
        authedUser,
    };
}

export const logoutAuthedUser = () => {
    return {
        type: LOGOUT_AUTHED_USER,
    };
}

export const handleOnLogin = (username, password) => (dispatch, getState) => {
    const { users } = getState();

    const user = Object.values(users).find((user) => user.id === username && user.password === password);

    if (!!user) {
        return dispatch(setAuthedUser(user));
    }
}

export const handleOnLogout = () => {
    return (dispatch) => {
        return dispatch(logoutAuthedUser());
    };
}