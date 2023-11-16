import { saveQuestion, saveQuestionAnswer } from "../../api/api";
import { ADD_ANSWER_QUESTION, ADD_QUESTION, RECEIVE_QUESTIONS } from "../constants/questions-constants";
import { addAnswerUser, addQuestionUser } from "./user-actions";

export const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

const addQuestion = (question) => {
    return {
        type: ADD_QUESTION,
        question,
    };
}

const addAnswerQuestion = (author, qid, answer) => {
    return {
        type: ADD_ANSWER_QUESTION,
        author,
        qid,
        answer,
    };
}

export const handleAddQuestion = (firstOption, secondOption) => {
    return async (dispatch, getState) => {
        const { authedUser } = getState();

        return saveQuestion(firstOption, secondOption, authedUser)
            .then((question) => {
                dispatch(addQuestion(question));
                dispatch(addQuestionUser(question))
            })
    };
}

export const handleAddAnswer = (questionId, answer) => {
    return async (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestionAnswer(authedUser.id, questionId, answer)
            .then(() => {
                dispatch(addAnswerQuestion(authedUser.id, questionId, answer));
                dispatch(addAnswerUser(authedUser.id, questionId, answer));
            });
    };
}