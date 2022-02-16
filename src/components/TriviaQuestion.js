import React from 'react'

/*
 * Takes in props for the question, right answer and wrong answers
 * props are: 
 * id
 * question
 * answerOptions -> comes as an array
 * answer
*/

function TriviaQuestion(props) {
    return (
        <div className='question-container'>
            <h1>{props.question}</h1>
            <div className='question-button-container'>
                <button 
                    className='question-button' 
                    id={props.id}
                    onClick={props.checkAnswer}
                >
                    {props.answerOptions[0]}
                </button>
                <button 
                    className='question-button' 
                    id={props.id}
                    onClick={props.checkAnswer}
                >
                    {props.answerOptions[1]}
                </button>
                <button 
                    className='question-button' 
                    id={props.id}
                    onClick={props.checkAnswer}
                >
                    {props.answerOptions[2]}
                </button>
                <button 
                    className='question-button' 
                    id={props.id}
                    onClick={props.checkAnswer}
                >
                    {props.answerOptions[3]}
                </button>
            </div>
            <hr/>
        </div>
    )
}

export default TriviaQuestion