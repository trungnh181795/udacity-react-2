import { ADD_ANSWER_USER, ADD_QUESTION_USER, RECEIVE_USERS } from "../constants/user-constants";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            };
        case ADD_ANSWER_USER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            };
        case ADD_QUESTION_USER:
            return {
                ...state,
                [action.author?.id]: {
                    ...state[action.author.id],
                    questions: state[action.author.id].questions.concat(action.qid)
                }
            };
        default:
            return state;
    }
}

export default userReducer