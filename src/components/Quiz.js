import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Question from "./Question";
import { QuizContext } from "../contexts/QuizProvider";
import axios from "axios";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const location = useLocation();
  const { shiken_kubun, shiken_day, day_kubun } = location.state;

  useEffect(async () => {
    const getQuestions = async () => {
      const response = await axios.get('http://localhost:5000/api/get_questions', {params:{shiken_kubun: shiken_kubun, shiken_day : shiken_day, day_kubun : day_kubun}});
      return response.data;
    };
    const questions = await getQuestions();
    dispatch({ type: "INIT_QUESTION_DATA",
      payload: { 'shiken_kubun' : shiken_kubun, 'shiken_day': shiken_day, 'day_kubun': day_kubun,
        'questions' : questions, 'showResults' : false, 'currentQuestionIndex' : 0, 'correctAnswersCount' : 0}});
  },[]);

  return (
    <div className="quiz">
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">お疲れ様でした!</div>
          <div className="results-info">
            <div>
              {quizState.questions.length}問中で{quizState.correctAnswersCount}問正解でした。<br/>
              正解率は{Math.round((quizState.correctAnswersCount/quizState.questions.length)*100)}%です。
            </div>
          </div>
          <div>
            <Link to="/">
              <button className="btn">ホームへ</button>
            </Link>
          </div>
        </div>
      )}
      {!quizState.showResults && (
        <div>
          <div className="score">
            問{quizState.currentQuestionIndex + 1}
          </div>
          <Question />

          {quizState.selected_ans_no && (
            <div
              onClick={() => dispatch({ type: "NEXT_QUESTION" })}
              className="next-button"
            >
              次の問題へ
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
