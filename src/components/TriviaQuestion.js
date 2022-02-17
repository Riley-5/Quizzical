import React from 'react'
import Button from './Button'

/*
 * Takes in props for the question, right answer and wrong answers
 * props are: 
 * id
 * question
 * answerOptions -> comes as an array
 * answer
*/

// TODO give buttons their own id

function TriviaQuestion(props) {
    // Map the answerOptions to their own custom Button component
    const questionButton = props.answerOptions.map(button => (
        <Button
            key={button}
            id={props.answerOptions.indexOf(button)}
            option={button}
            checkAnswer={props.checkAnswer}
        />
    ))

    return (
        <div className='question-container'>
            <h1>{props.question}</h1>
            <div className='question-button-container'>
                {questionButton}
            </div>
            <hr/>
        </div>
    )
}

export default TriviaQuestion