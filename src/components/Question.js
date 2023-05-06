import Answer from "./Answer";
import QuestionDetail from "./QuestionDetail";
import { useContext } from "react";
import { QuizContext } from "../contexts/QuizProvider";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  return (
    <div>
      <div className="question">
        {currentQuestion && currentQuestion.question.map((question) => (
          <QuestionDetail className="row"
            que_line_attr={question.que_line_attr}
            que_line_no={question.que_line_no}
            que_line_contents={question.que_line_contents}
            key={question.que_line_no}
          />
        ))}
      </div>
      <div className="answers">
        {currentQuestion && currentQuestion.answers.map((answer, index) => (
          <Answer
            ans_no={answer.ans_no}
            ans_contents={answer.ans_contents}
            is_correct_ans={answer.is_correct_ans}
            ans_attr={answer.ans_attr}
            selected_ans_no={quizState.selected_ans_no}
            key={index}
            index={index}
            onSelectAnswer={ (ans_no, index) => dispatch({ type: "SELECT_ANSWER", payload: {ans_no, index} })}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;


