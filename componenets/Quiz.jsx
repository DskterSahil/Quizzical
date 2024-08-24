import React from 'react';
import { QuizContext } from '/index.jsx';
import he from "he";


export default function Quiz() {
  const { quizData, selectedAnswers, handleAnswerClick, showResults, score,
        restartQuiz } = React.useContext(QuizContext);

  const questionBlock = (data) => {
    if (data.questionDetails && Array.isArray(data.questionDetails)) {
      return data.questionDetails.map((item, questionIndex) => (
        <div className="item-container" key={questionIndex}>
          <p>{he.decode(item.question)}</p>
          {item.options.map((option, answerIndex) => (
            <button
              className={`option-btn ${
                quizData.showAnswer
                  ? option === item.correctAnswer
                    ? 'correct'
                    : selectedAnswers[questionIndex] === option
                    ? 'incorrect'
                    : ''
                  : selectedAnswers[questionIndex] === option
                  ? 'selected'
                  : ''
              }`}
              key={answerIndex}
              onClick={() => handleAnswerClick(questionIndex, option)}
              disabled={quizData.showAnswer} // Disable buttons once answers are shown
            >
              {he.decode(option)}
            </button>
          ))}
        </div>
      ))
    } else {
      return <p>No question right now!!</p>
    }
  };

  const questionEle = questionBlock(quizData)
  const checkAnsEl = <button className="chk-btn" onClick={showResults}>Check Answer</button>

  return (
    
       <>
            {questionEle}
            <div className='score-container'>
            {quizData.isCompleted && <p className='score-para'>Your Score: {score}/5</p>}
            </div>
            <div className={`chk_btn-container ${quizData.isCompleted ? 'padding-remover' : ''}`}>
                {quizData.isCompleted ? (
                    <button className="chk-btn" onClick={restartQuiz}>
                        Play Again
                    </button>
                ) : (
                    <button className="chk-btn" onClick={showResults}>
                        Check Answer
                    </button>
                )}
            </div>
            
        </>
    
  );
}
