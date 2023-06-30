import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../css/quizpage.css';

function QuizPage() {
  const [wordList] = useLocalStorage('wordList', []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Randomly select a word from the word list
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWordIndex(randomIndex);
    setShowAnswer(false);
  }, [wordList]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextWord = () => {
    const nextIndex = (currentWordIndex + 1) % wordList.length;
    setCurrentWordIndex(nextIndex);
    setShowAnswer(false);
  };

  const renderQuizQuestion = () => {
    const currentWord = wordList[currentWordIndex];

    return (
      <div className='quizpage-wrapper'>
        <h1 className="quizpage-title">Quiz</h1>
        <div className="quizpage-container">
          <h2 className="quizpage-question">{currentWord.word}</h2>
          <div className={`quizpage-answer ${showAnswer ? 'quizpage-answer-visible' : 'quizpage-answer-blurred'}`}>
            {currentWord.context}
          </div>
          {!showAnswer && (
            <button onClick={handleShowAnswer} className="quizpage-answer-button">
              Show Meaning
            </button>
          )}
          {showAnswer && (
            <button onClick={handleNextWord} className="quizpage-next-button">
              Next Word
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='quizpage-wrapper'>
      {wordList.length > 0 && renderQuizQuestion()}
      {wordList.length === 0 && (
        <p className="quizpage-no-words">No words available</p>
      )}
    </div>
  );
}

export default QuizPage;
