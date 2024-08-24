import React from 'react';
import ReactDOM from 'react-dom/client';
import Intro from './componenets/Intro'
import Quiz from './componenets/Quiz'


const QuizContext = React.createContext()

function App() {
  
  let quizStats = {
    questionDetails : '',
    showAnswer: false,
    isCompleted: false
  } 
  
  const [quizStarted, setQuizStart] = React.useState(false)
  const [quizData, setQuizData] = React.useState(quizStats)
  const [selectedAnswers, setSelectedAnswers] = React.useState({})
  const [score, setScore] = React.useState(0)
  
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
React.useEffect(() => {
 
    async function fetchQuizData() {
        try {
            const res = await fetch('https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple')
            const data = await res.json()

         
            setQuizData(prevData => ({
                ...prevData,
                questionDetails: data.results.map(obj => {
                    const answerArray = [obj.correct_answer, ...obj.incorrect_answers];
                    return {
                        question: obj.question,
                        options: shuffleArray(answerArray),
                        correctAnswer: obj.correct_answer,
                        userAnswer: undefined
                    };
                })
            }));
        } catch (error) {
            console.error("Failed to fetch quiz data:", error);
        }
    }

  
    fetchQuizData()
}, [])

  function handleAnswerClick(questionIdx, optionSelected){
    
      setSelectedAnswers(prevState => (
        {
          ...prevState,
          [questionIdx]: optionSelected
        }
      ))
  }
  
  function showResults() {
        let correctCount = 0;
        quizData.questionDetails.forEach((question, idx) => {
            if (selectedAnswers[idx] === question.correctAnswer) {
                correctCount++
            }
        });

        setScore(correctCount)

        setQuizData((prevState) => ({
            ...prevState,
            showAnswer: true,
            isCompleted: true,
        }))
    }
    
    console.log(quizData.showAnswer)
  
  function handleStartQuiz(){
    setQuizStart(prevState=> !prevState)

  }
    function restartQuiz() {
        setQuizStart(false)
        setQuizData(quizStats)
        setSelectedAnswers({})
        setScore(0)
    }
  return (
    <QuizContext.Provider value={
       {
        handleStartQuiz,
         quizData,
         handleAnswerClick,
         selectedAnswers,
         showResults,
         restartQuiz,
         score
         
         
          }
           }>
      {quizStarted ? <Quiz/> : <Intro/>}
    </QuizContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 

export {QuizContext}