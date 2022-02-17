import React from 'react'

/*
 * Reacieves the following props
 * option
 * id
 * checkAnswer
*/

function Button(props) {
    return (
        <button id={props.id} className='question-button' onClick={props.checkAnswer}>{props.option}</button>
    )
}

export default Button