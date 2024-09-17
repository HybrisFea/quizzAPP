// src/App.js
import React, { useState } from "react";
import Question from "./Question";
import Result from "./Result";
import Login from "./Login";
import FileUpload from "./FileUpload";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showIntermediateResults, setShowIntermediateResults] = useState(false);
  const [intermediateResults, setIntermediateResults] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleFileUpload = (data) => {
    setQuizData(data);
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex % 30 === 0 || nextIndex === quizData.length) {
      const score = calculateIntermediateScore(nextIndex);
      setIntermediateResults([...intermediateResults, score]);
      setShowIntermediateResults(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleChange = (option) => {
    const currentAnswers = answers[currentQuestionIndex] || [];
    if (currentAnswers.includes(option)) {
      setAnswers({
        ...answers,
        [currentQuestionIndex]: currentAnswers.filter((o) => o !== option),
      });
    } else if (
      currentAnswers.length < quizData[currentQuestionIndex].answers.length
    ) {
      setAnswers({
        ...answers,
        [currentQuestionIndex]: [...currentAnswers, option],
      });
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateIntermediateScore = (endIndex) => {
    let score = 0;
    const startIndex = endIndex - 30;
    quizData.slice(startIndex, endIndex).forEach((question, index) => {
      const correctAnswers = question.answers;
      const userAnswers = answers[startIndex + index] || [];
      if (
        correctAnswers.length === userAnswers.length &&
        correctAnswers.every((val) => userAnswers.includes(val))
      ) {
        score += 1;
      }
    });
    return score;
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((question, index) => {
      const correctAnswers = question.answers;
      const userAnswers = answers[index] || [];
      if (
        correctAnswers.length === userAnswers.length &&
        correctAnswers.every((val) => userAnswers.includes(val))
      ) {
        score += 1;
      }
    });
    return score;
  };

  const continueQuiz = () => {
    setShowIntermediateResults(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (!quizData) {
    return <FileUpload onFileUpload={handleFileUpload} />;
  }

  return (
    <div className='App'>
      <header>
        <h1>EXAM</h1>
      </header>
      {showResults ? (
        <Result score={calculateScore()} totalQuestions={quizData.length} />
      ) : showIntermediateResults ? (
        <div>
          <h2>Intermediate Results</h2>
          <ul>
            {intermediateResults.map((score, index) => (
              <li key={index}>
                Report {index + 1}: {score} correct answers out of 30
              </li>
            ))}
          </ul>
          <button onClick={continueQuiz}>Continue</button>
        </div>
      ) : (
        <div>
          <Question
            questionData={quizData[currentQuestionIndex]}
            handleChange={handleChange}
            selectedOptions={answers[currentQuestionIndex] || []}
            questionNumber={currentQuestionIndex}
            maxSelections={quizData[currentQuestionIndex].answers.length}
          />
          <div className='navigation-buttons'>
            {currentQuestionIndex > 0 && (
              <button onClick={handlePrev}>Previous</button>
            )}
            {currentQuestionIndex < quizData.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
