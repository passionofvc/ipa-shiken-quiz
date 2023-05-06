import questions from "../data";
import { shuffleAnswers } from "../helpers";

export const initialState = {
    shiken_kubun : "",
    shiken_day : "",
    day_kubun : "",
    questions :[],               // all questions with details and answers detail infos
    currentQuestionIndex: 0,     // current questions No
    selected_ans_no: undefined,  // current selected answer
    answers: [],                 // current question answers(4)
    showResults: false,          // show final resutls
    correctAnswersCount: 0,      // the correct answer count
};

export const reducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case "INIT_QUESTION_DATA" : {
            return {
                ...state,
                shiken_kubun: action.payload.shiken_kubun,
                shiken_day: action.payload.shiken_day,
                day_kubun: action.payload.day_kubun,
                questions : action.payload.questions,
                answers : shuffleAnswers(questions[action.payload.currentQuestionIndex].answers),
                showResults :  action.payload.showResults,
                currentQuestionIndex : action.payload.currentQuestionIndex,
                correctAnswersCount : action.payload.correctAnswersCount,
            };
        }
        case "SELECT_ANSWER": {
            const correctAnswersCount =
                state.questions[state.currentQuestionIndex].answers[action.payload.index].is_correct_ans ?
                    state.correctAnswersCount + 1 :
                    state.correctAnswersCount;
            return {
                ...state,
                selected_ans_no: action.payload.ans_no,  //選択した答えの更新
                correctAnswersCount,             //正解数の更新
            };
        }
        case "NEXT_QUESTION": {
            const showResults = state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = showResults
                ? state.currentQuestionIndex
                : state.currentQuestionIndex + 1;
            const answers = showResults
                ? []
                : shuffleAnswers(state.questions[currentQuestionIndex].answers);
            return {
                ...state,
                selected_ans_no: undefined, //問題開始時に初期選択してない状態
                showResults,
                currentQuestionIndex,
                answers,
            };
        }
        default:
            return state;
    }
};
