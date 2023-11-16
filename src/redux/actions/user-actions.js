import { ADD_ANSWER_USER, ADD_QUESTION_USER, RECEIVE_USERS } from "../constants/user-constants";

export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users,
    };
}

export const addAnswerUser = (authedUser, qid, answer) => {
    return {
        type: ADD_ANSWER_USER,
        authedUser,
        qid,
        answer,
    };
}

export const addQuestionUser = ({ author, id }) => {
    return {
        type: ADD_QUESTION_USER,
        author,
        qid: id,
    };
}