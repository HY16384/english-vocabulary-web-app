import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../css/wordlistpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

function WordListPage() {
  const [newWord, setNewWord] = useState({
    word: '',
    context: '',
  });
  const [wordList, setWordList] = useLocalStorage('wordList', []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const wordsPerPage = 5; // Number of words to display per page

  const addWord = (event) => {
    event.preventDefault();

    if (newWord.word.trim() !== '') {
      const currentDateTime = new Date();
      const formattedDateTime = currentDateTime.toLocaleString(); // Format the date and time

      const wordWithDateTime = {
        ...newWord,
        dateTime: formattedDateTime, // Add the current date and time as the creation timestamp
      };

      setWordList([...wordList, wordWithDateTime]);
      setNewWord({ word: '', context: '' });
    }
  };

  const deleteWord = (index) => {
    const updatedList = [...wordList];
    updatedList.splice(index, 1);
    setWordList(updatedList);
  };

  // Calculate total number of pages
  const filteredWords = wordList.filter((word) =>
    word.word.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredWords.length / wordsPerPage);

  // Get current words for the selected page
  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = filteredWords.slice(indexOfFirstWord, indexOfLastWord);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sort words
  const sortedWords = currentWords.sort((a, b) => {
    let comparison = 0;
    if (sortOption === 'date') {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      comparison = dateA - dateB;
    } else if (sortOption === 'alphabet') {
      const wordA = a.word.toLowerCase();
      const wordB = b.word.toLowerCase();
      comparison = wordA.localeCompare(wordB);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="wordlist-container">
      <h1 className="wordlist-title">Word List</h1>
      <form onSubmit={addWord} className="wordlist-form">
        <input
          type="text"
          placeholder="Enter a word"
          value={newWord.word}
          onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
          className="wordlist-input"
        />
        <textarea
          placeholder="Enter additional context or notes"
          value={newWord.context}
          onChange={(e) => setNewWord({ ...newWord, context: e.target.value })}
          className="wordlist-textarea"
        />
        <button type="submit" className="wordlist-button">
          Add Word
        </button>
      </form>
      <div className="wordlist-controls">
        <input
          type="text"
          placeholder="Search words"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="wordlist-search"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="wordlist-sort"
        >
          <option value="date">Sort by Date</option>
          <option value="alphabet">Sort by Alphabet</option>
        </select>
        <button
          onClick={toggleSortDirection}
          className="wordlist-sort-direction"
        >
          <FontAwesomeIcon icon={sortDirection === 'asc' ? faArrowUp : faArrowDown} />
        </button>
      </div>
      <ul className="wordlist-list">
        {sortedWords.map((word, index) => (
          <li key={index} className="wordlist-item">
            <div className='wordlist-item-container'>
              <span className='wordlist-word'>{word.word}</span>
              <span className='wordlist-context'>{word.context}</span>
              <span className="wordlist-date">Created on: {word.dateTime}</span>
            </div>
            <button
              onClick={() => deleteWord(index)}
              className="wordlist-delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="wordlist-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`wordlist-pagination-button ${
                page === currentPage ? 'active' : ''
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default WordListPage;
