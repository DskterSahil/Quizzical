import React from 'react'
import {QuizContext} from '/index.jsx'

export default function Intro(){
    const {handleStartQuiz}= React.useContext(QuizContext)
    
    
    return(
        <div className="intro-container"> 
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro-subtitle">Some description if needed</p>
            <button className='intro-btn' onClick={handleStartQuiz}>Start Quiz</button>
        </div>
    )
}