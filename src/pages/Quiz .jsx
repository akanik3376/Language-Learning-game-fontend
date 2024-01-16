import React, { useState } from 'react';
import { MdNavigateNext } from "react-icons/md";

const quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 'Paris',
    },
    {
        question: 'What is the capital of Germany?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 'Berlin',
    },
    {
        question: 'What is the capital of Spain?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 'Madrid',
    },
    // Add more questions as needed
];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState()

    // Handle the click event when an option is selected
    const handleOptionClick = (selectedOption) => {
        if (selectedOption === quizData[currentQuestion].correctAnswer) {
            setScore(score + 1);
            setFeedback('Correct!');
        } else {
            setFeedback(`Wrong! The correct answer is ${quizData[currentQuestion].correctAnswer}`);
        }

        setSelectedOption(selectedOption);

        // Disable further clicks on options
        document.querySelectorAll('.option-button').forEach((button) => {
            button.disabled = true;
        });
    };

    // Handle the click event for the "Next" button
    const nextQuestion = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setFeedback('');

            // Enable option buttons for the new question
            document.querySelectorAll('.option-button').forEach((button) => {
                button.disabled = false;
            });
        } else {
            // Quiz completed
            setMessage(`Quiz Completed! Your Score: ${score}/${quizData.length}`);
        }
    };

    return (
        <div className="mx-auto max-w-lg">
            {/* Header with score */}

            <h1 className="text-3xl font-bold text-center my-8">Quiz Time Start Now!</h1>

            {/* Question display */}
            <div className="mb-4 text-2xl">
                <strong>Question {currentQuestion + 1}:</strong> {quizData[currentQuestion].question}
            </div>

            {/* Options grid */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {quizData[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`${selectedOption === option
                            ? 'bg-purple-600 text-white'
                            : 'bg-blue-500 text-white'
                            } p-3 rounded-md `}
                        disabled={selectedOption !== null}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Feedback and Next button */}

            <div className="mt-4">
                {feedback === 'Correct!' ? <p className="text-green-500 mb-2">{feedback}</p> : <p className="text-red-500 mb-2">{feedback}</p>}
                {selectedOption !== null && (
                    <button
                        className="bg-green-500 text-white p-3 rounded-md hover:bg-green-700"
                        onClick={nextQuestion}
                    >
                        Next
                    </button>
                )}
            </div>
            <h3 className="mt-4 text-3xl font-semibold">{message}</h3>
        </div>
    );
};

export default Quiz;
