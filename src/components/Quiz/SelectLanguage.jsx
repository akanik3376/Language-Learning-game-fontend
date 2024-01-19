import React, { useState, useEffect } from 'react';


const SelectLanguage = () => {
    const [exercise, setExercise] = useState({});
    const [userResponse, setUserResponse] = useState('');
    const [feedback, setFeedback] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const fetchExercise = () => {
        // Replace the URL with your actual backend API endpoint
        fetch(`http://localhost:5000/api/exercise?language=${selectedLanguage}`)
            .then(response => response.json())
            .then(data => setExercise(data))
            .catch(error => console.error('Error fetching exercise:', error));
    };

    useEffect(() => {
        if (selectedLanguage) {
            fetchExercise();
        }
    }, [selectedLanguage]);

    const submitResponse = () => {
        fetch('http://localhost:5000/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_response: userResponse }),
        })
            .then(response => response.json())
            .then(data => setFeedback(data.score))
            .catch(error => console.error('Error submitting response:', error));
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setSelectedLanguage(selectedLanguage);
    };
    return (

        <div className="max-w-md p-6 bg-white rounded-md">
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
            {selectedLanguage && (
                <>
                    <div className="mb-4">
                        <p className="text-lg">{exercise.exercise_text}</p>
                        <textarea
                            className="w-full p-2 border rounded mt-2"
                            placeholder="Your answer"
                            value={userResponse}
                            onChange={(e) => setUserResponse(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitResponse}>
                        Submit
                    </button>
                    {feedback && <div className="text-green-500 mt-4">{feedback}</div>}
                </>
            )}
        </div>

    );
}

export default SelectLanguage;