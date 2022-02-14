import React, {useState} from 'react'
import './styles.css'
import IntroScreen from './components/IntroScreen'

function App() {
    // Create state to track if the 'Start Quiz button was clicked'
    const [startQuiz, setStartQuiz] = useState(false)

    // Handle the click event from the 'Start Quiz' button
    function handleClick() {
        // If 'Start Quiz' button click set startQuiz to true
        setStartQuiz(prevStartQuiz => !prevStartQuiz)
    }

    return (
        !startQuiz && <IntroScreen startQuiz={handleClick}/>
    )
}

export default App