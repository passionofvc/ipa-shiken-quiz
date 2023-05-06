import {useContext} from "react";
import {QuizContext} from "../contexts/QuizProvider";

const Answer = ({
  ans_no,
  ans_contents,
  is_correct_ans,
  ans_attr,
  selected_ans_no,
  index,
  onSelectAnswer,
}) => {
  const [quizState] = useContext(QuizContext);
  const { shiken_kubun, shiken_day, day_kubun, currentQuestionIndex } = quizState;
  const shiken_day_no_slash = shiken_day.replaceAll('/', '');
  const q_no =  ("00" + (currentQuestionIndex + 1)).slice(-2);
  const letterMapping = ["ア", "イ", "ウ", "エ"];
  const isCorrectAnswer = ( selected_ans_no === ans_no && is_correct_ans );
  const isWrongAnswer   = ( selected_ans_no === ans_no && !is_correct_ans );
  const correctAnswerClass = isCorrectAnswer ? "correct-answer" : "";
  const wrongAnswerClass = isWrongAnswer ? "wrong-answer" : "";
  const disabledClass = selected_ans_no ? "disabled-answer" : "";
  let img = '';
  if (ans_attr === 'picture') {
    const pArray = ans_contents.split('/');
    const file_name = pArray[0];
    const image_size = pArray[1];
    const image_size_h_w = image_size.split(':')[1];
    const width = image_size_h_w.split('×')[0];
    const height = image_size_h_w.split('×')[1];
    img = <img src={'/images/' + `${shiken_kubun}/${shiken_day_no_slash}/${day_kubun}/${q_no}/${file_name}`} width={width} height={height} alt={ans_contents} className="img"/>;
  }
  return (
    <div className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`} tabIndex="-1">
      <div className="answer-letter" onClick={() => onSelectAnswer(ans_no, index)}>{letterMapping[index]}</div>
      {
        ans_attr === 'text'
        && ( <div className="answer-text">{ans_contents}</div> )
      }
      {
        ans_attr === 'picture'
        && ( <div> {img} </div> )
      }
    </div>
  );
};

export default Answer;
