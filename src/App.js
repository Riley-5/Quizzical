import React, {useState, useEffect} from 'react'
import './styles.css'
import {nanoid} from 'nanoid'
import IntroScreen from './components/IntroScreen'
import TriviaQuestion from './components/TriviaQuestion'

/* TODO
 * Make sure API request loads before running the quiz itself
*/

function App() {
    // Create state to track if the 'Start Quiz button' was clicked
    const [startQuiz, setStartQuiz] = useState(false)

    // Create state to store an array of objects for the trivia questions
    const [questionData, setQuestionData] = useState([])

    // Fetch the question from the API when the startQuiz becomes true
    useEffect(() => {
        // Create an array to hold the data comming in from the API
        const questionsApiData = []
        // Fetch data from API 
        fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => (
                // Loop through each returned element from the API and put the results in a custom object
                data.results.forEach(element => (
                    questionsApiData.push({
                        id: nanoid(),
                        question: element.question,
                        answerOptions: [
                            element.correct_answer, element.incorrect_answers[0], element.incorrect_answers[1], element.incorrect_answers[2]
                        ],
                        answer: element.correct_answer
                    })
                ))
            ))
        // Set the QuestionData state to the questions array
        setQuestionData(questionsApiData)
    }, [startQuiz])

    // Handle the click event from the 'Start Quiz' button
    function handleStartQuizClick() {
        // If 'Start Quiz' button click set startQuiz to true
        setStartQuiz(prevStartQuiz => !prevStartQuiz)
    }

    // Map over the objects and put them in their own divs passing the necessary props
    const questions = questionData.map(data => (
        <TriviaQuestion
            key={data.id}
            question={data.question}
            answerOptions={data.answerOptions}
            correctAnswer={data.answer}
        />
    ))

    return (
        <div className='app-container'>
            {
                // If startQuiz is false then display the intro screen
                !startQuiz && <IntroScreen 
                    startQuiz={handleStartQuizClick}
                />
            }
            
            {
                // If startQuiz is true display the questions
                startQuiz && questions
            }
            {
                // If startQuiz is true display 'Check Answers' button
                startQuiz && <button className='check-answers-button'>Check Answers</button>
            }
        </div>
    )
}

export default App
