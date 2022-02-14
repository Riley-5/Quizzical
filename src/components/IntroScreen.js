import React from 'react'


/* 
 * Accept props for the 'Start Quiz button
 * If the button is clicked it must set the StartQuiz bool to true
*/

function IntroScreen(props) {
    return (
        <div className='intro-container'>
            <h1>Quizzical</h1>
            <h4>Test your Trivia</h4>
            <button className='start-quiz-button' onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}

export default IntroScreen