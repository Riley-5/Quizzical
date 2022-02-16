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

    // Create state to store the number of correct answers
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0)

    // Create state to track if the check answers button is clicked
    const [checkAnswerClicked, setCheckAnswerClicked] = useState(false)

        // Shuffle the array
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
            
                // Generate random number
                var j = Math.floor(Math.random() * (i + 1));
                            
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            } 
            return array;
        }

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
                        isCorrect: false,
                        question: element.question,
                        answerOptions: shuffleArray([
                            element.correct_answer, element.incorrect_answers[0], element.incorrect_answers[1], element.incorrect_answers[2]
                        ]),
                        answer: element.correct_answer
                    })
                ))
            ))
        // Set the QuestionData state to the questions array
        setQuestionData(questionsApiData)
    }, [])

    // Handle the click event from the 'Start Quiz' button
    function handleStartQuizClick() {
        // If 'Start Quiz' button click set startQuiz to true
        setStartQuiz(prevStartQuiz => !prevStartQuiz)
    }

    function checkAnswer(event, id) {
        const userAnswer = event.target.innerHTML
        setQuestionData(prevQuestionData => prevQuestionData.map(question => {
            /* If the id matches and the userAnswer is correct 
             * Change the isCorrect bool to true
             * Else return question object
            */
            return question.id === id && userAnswer === question.answer ?
                    {...question, isCorrect: true} :
                    question
            }))
    }

    function tallyAnswers() {
        for (let i = 0; i < questionData.length; i++) {
            if (questionData[i].isCorrect === true) {
                setCorrectAnswerCount(prevCorrectAnswerCount => prevCorrectAnswerCount + 1)
            }
        }

        setCheckAnswerClicked(true)
    }

    // Map over the objects and put them in their own divs passing the necessary props
    const questions = questionData.map(data => (
        <TriviaQuestion
            key={data.id}
            id={data.id}
            isCorrect={data.isCorrect}
            question={data.question}
            answerOptions={data.answerOptions}
            answer={data.answer}
            checkAnswer={(event) => checkAnswer(event, data.id)}
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
                startQuiz && !checkAnswerClicked && <button className='check-answers-button' onClick={tallyAnswers}>Check Answers</button>
            }
            {
                // If check answer is true then display the tallied score
                checkAnswerClicked && <h4>You scored {correctAnswerCount}/5 correct answers</h4>
            }
        </div>
    )
}

export default App
