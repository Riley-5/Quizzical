import React, {useState, useEffect} from 'react'
import './styles.css'
import IntroScreen from './components/IntroScreen'
import TriviaQuestion from './components/TriviaQuestion'

/* TODO
 * Make sure API request loads before running the quiz itself
*/

function App() {
    // Create state to track if the 'Start Quiz button' was clicked
    const [startQuiz, setStartQuiz] = useState(false)

    // Create state to store a objects for the trivia questions
    const [questionData, setQuestionData] = useState([{}])

    // Fetch the question from the API when the startQuiz becomes true
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => setQuestionData(data.results))
    }, [startQuiz])

    // Handle the click event from the 'Start Quiz' button
    function handleStartQuizClick() {
        // If 'Start Quiz' button click set startQuiz to true
        setStartQuiz(prevStartQuiz => !prevStartQuiz)
    }

    // Map over the objects and put them in their own divs
    const questions = questionData.map(data => (
        <TriviaQuestion
            key={data.question}
            question={data.question}
            rightAnswer={data.correct_answer}
            wrongAnswer={data.incorrect_answers}
        />
    ))

    return (
        <div className='app-container'>
            {
                // If startQuiz is false then display the intro screen
                !startQuiz && <IntroScreen startQuiz={handleStartQuizClick}/>
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