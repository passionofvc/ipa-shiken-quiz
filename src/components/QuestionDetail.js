import { useContext } from "react";
import { QuizContext } from "../contexts/QuizProvider";

const QuestionDetail = (
    {
      que_line_no,
      que_line_attr,
      que_line_contents,
    }
) => {
  const [quizState] = useContext(QuizContext);
  const { shiken_kubun, shiken_day, day_kubun, currentQuestionIndex } = quizState;
  const shiken_day_no_slash = shiken_day.replaceAll('/', '');
  const q_no =  ("00" + (currentQuestionIndex + 1)).slice(-2);
  let img = '';
  if (que_line_attr === 'picture') {
      const pArray = que_line_contents.split('/');
      const file_name = pArray[0];
      const image_size = pArray[1];
      const image_size_h_w = image_size.split(':')[1];
      const width = image_size_h_w.split('×')[0];
      const height = image_size_h_w.split('×')[1];
      img = <img src={'/images/' + `${shiken_kubun}/${shiken_day_no_slash}/${day_kubun}/${q_no}/${file_name}`} width={width} height={height} alt={que_line_contents}/>;
  }
  return (
    <div>
      <div>
        {
          que_line_attr === 'text' &&
          ( <div className="question">{que_line_contents}</div> )
        }
        {
          que_line_attr === 'picture'
          && ( <div className="question">{img}</div> )
        }
      </div>
    </div>
  );
};

export default QuestionDetail;
