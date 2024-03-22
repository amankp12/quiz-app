import React, { useState, useEffect } from "react";
import Question from "./Question";
import Score from "./Score";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  const fetchQuestions = async () => {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data.results);
    };
    getQuestions();
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      // Check if the selected option is the correct answer
      if (questions[currentQuestion].correct_answer === selectedOption) {
        // Update score only if the selected option is correct
        setScore((prevScore) => prevScore + 1);
      }
      // Move to the next question
      setCurrentQuestion(nextQuestion);
      // Reset selected option for the next question
      setSelectedOption("");
    } else {
      // Show alert only at the last question
      alert(`Game Over! Your Final Score is ${score}`);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-5">World Quiz</h1>

      <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        {questions.length > 0 && (
          <>
            <Question
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].incorrect_answers.concat(
                questions[currentQuestion].correct_answer
              )}
              selected={selectedOption}
              onOptionChange={handleOptionChange}
            />
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Next Question
            </button>
            <div className="text-center mt-4">
              <h2 className="text-xl font-bold">Your Current Score: {score}</h2>
            </div>
          </>
        )}
        {currentQuestion === questions.length && <Score score={score} />}
      </div>
    </div>
  );
};

export default App;
