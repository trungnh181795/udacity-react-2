import { getInitialData } from "../../api/api";
import { receiveQuestions } from "./question-actions";
import { receiveUsers } from "./user-actions";

export const handleInitialData = () => {
    return async (dispatch) => {
        return getInitialData().then(({users, questions}) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        });
    };
}