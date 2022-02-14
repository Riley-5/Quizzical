import React from 'react'

/*
 * Takes in props for the question, right answer and wrong answers
 * props are: 
 * question
 * rightAnswer
 * WrongAnswer -> which comes as an array
*/

function TriviaQuestion(props) {
    return (
        <div className='question-container'>
            <h1>{props.question}</h1>
            <div className='question-button-container'>
                <button className='question-button'>{props.rightAnswer}</button>
                <button className='question-button'>{props.wrongAnswer[0]}</button>
                <button className='question-button'>{props.wrongAnswer[1]}</button>
                <button className='question-button'>{props.wrongAnswer[2]}</button>
            </div>
            <hr/>
        </div>
    )
}

export default TriviaQuestion