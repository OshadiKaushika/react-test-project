import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

export const SearchBar = ({ searchInput, setSearchInput, records }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchInput === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = records.filter(record =>
        record.title.toLowerCase().includes(searchInput.toLowerCase())
      ).map(record => record.title);
      setSuggestions(filteredSuggestions);
    }
  }, [searchInput, records]);

  return (
    <div className="input-wrapper">
      <input
        placeholder="Type to search something....."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <FaSearch id="search-icon" />
      {searchInput && (
        <ul className="suggestions-list">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => setSearchInput(suggestion)}>
                {suggestion}
              </li>
            ))
          ) : (
            <li className="no-result">No result found.</li>
          )}
        </ul>
      )}
    </div>
  );
};
