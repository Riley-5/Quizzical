import React from 'react'

/*
 * Reacieves the following props
 * Option
 * Id
*/

function Button(props) {
    console.log(props)
    return (
        <button id={props.id} className='question-button'>{props.option}</button>
    )
}

export default Button