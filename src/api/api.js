import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from "./data";

export async function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestion(optionOneText, optionTwoText, author) {
    console.log('test', { optionOneText, optionTwoText, author })
    return _saveQuestion({ optionOneText, optionTwoText, author });
}

export function saveQuestionAnswer(authedUserId, qid, answer) {
    return _saveQuestionAnswer({
        authedUser: authedUserId,
        qid,
        answer
    });
}