import React, { useState, useEffect } from 'react';
import { MdNavigateNext } from 'react-icons/md';

const Quiz = () => {
    // State variables
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [exercise, setExercise] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const [category, setCategory] = useState('easy');
    const [loading, setLoading] = useState(false);
    const [totalMarks, setTotalMarks] = useState(0);

    // Function to fetch exercise data based on selected language and category
    const fetchExercise = () => {
        setLoading(true);

        fetch(`http://localhost:5000/api/${selectedLanguage}/${category}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Set exercise data and calculate total marks
                setExercise(data);
                const marks = data.reduce((acc, question) => acc + question.marks, 0);
                setTotalMarks(marks);

                // Reset score when fetching new exercises for a different category
                setScore(0);
            })
            .catch((error) => console.error('Error fetching exercise:', error))
            .finally(() => setLoading(false));
    };

    // Effect to fetch exercise data when language or category changes
    useEffect(() => {
        if (selectedLanguage && category) {
            // Reset state when language or category changes
            setCurrentQuestion(0);
            setFeedback('');
            setMessage('');
            setShowButton(false);
            setSelectedOption(null); // Reset selected option when category or language changes
            fetchExercise();
        }
    }, [selectedLanguage, category]);

    // Handler for language change
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setSelectedLanguage(selectedLanguage);
    };

    // Handler for category change
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
    };

    // Handler for option click
    const handleOptionClick = (selectedOption) => {
        if (selectedOption === exercise[currentQuestion].correctAnswer) {
            setScore(score + exercise[currentQuestion].marks);
            setFeedback('Correct!');
        } else {
            setFeedback(`Wrong! The correct answer is ${exercise[currentQuestion].correctAnswer}`);
        }

        setSelectedOption(selectedOption);

        // Disable all option buttons
        document.querySelectorAll('.option-button').forEach((button) => {
            button.disabled = true;
        });
    };

    // Handler for next button click
    const handleNextOr = () => {
        if (currentQuestion < exercise.length - 1) {
            // Move to the next question
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null); // Reset selected option for the new question
            setFeedback('');

            // Enable all option buttons for the new question
            document.querySelectorAll('.option-button').forEach((button) => {
                button.disabled = false;
            });
        } else {
            // Quiz completed, show final message
            setMessage(`Quiz Completed! Your Score: ${score}/${totalMarks}`);
            setShowButton(true);
        }
    };


    //Quiz component
    return (
        <div className="mx-auto">
            <h1 className="text-3xl font-bold text-center mt-4">Quiz Time Start Now!</h1>

            <div className="flex md:flex-row flex-col md:justify-around p-6 bg-white rounded-md">
                <h1 className="text-2xl font-bold mb-4">Language Learning Quiz</h1>
                <div className="mb-4">
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Select Language:
                    </label>
                    <select
                        id="language"
                        name="language"
                        className="mt-1 p-2 border rounded w-full"
                        onChange={handleLanguageChange}
                    >
                        <option value="">Select Language</option>
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="spanish">Spanish</option>
                        <option value="german">German</option>
                        {/* Add more language options as needed */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Select Category:
                    </label>
                    <select
                        id="category"
                        name="category"
                        className="mt-1 p-2 border rounded w-full"
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select Category</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>

            {loading && <p className="text-center mt-4">Loading...</p>}

            {!loading && exercise.length > 0 && (
                <div>
                    <div className="mb-4 text-2xl mt-4">
                        <strong>Question {currentQuestion + 1}:</strong> {exercise[currentQuestion].question}
                        <p className="text-sm">Select here!</p>
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {exercise[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className={`option-button ${selectedOption === option ? 'bg-purple-600 text-white' : 'bg-blue-500 text-white'
                                    } p-3 rounded-md `}
                                disabled={selectedOption !== null}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="mt-4">
                        {feedback === 'Correct!' ? (
                            <p className="text-green-500 mb-2">{feedback}</p>
                        ) : (
                            <p className="text-red-500 mb-2">{feedback}</p>
                        )}
                        {selectedOption !== null && (
                            <button
                                className={`bg-green-500 text-white p-3 rounded-md flex items-center justify-center hover:bg-green-700`}
                                onClick={handleNextOr}
                            >
                                {showButton ? 'Complete' : 'Next'} <MdNavigateNext />
                            </button>
                        )}
                    </div>

                    <div>{message && <h3 className="mt-4 text-3xl font-semibold">{message}</h3>}</div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
