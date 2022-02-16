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
    // Shuffle array
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    const shuffledArray = shuffleArray(props.answerOptions)    

    return (
        <div className='question-container'>
            <h1>{props.question}</h1>
            <div className='question-button-container'>
                <button className='question-button'>{shuffledArray[0]}</button>
                <button className='question-button'>{shuffledArray[1]}</button>
                <button className='question-button'>{shuffledArray[2]}</button>
                <button className='question-button'>{shuffledArray[3]}</button>
            </div>
            <hr/>
        </div>
    )
}

export default TriviaQuestion