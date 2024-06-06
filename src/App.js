import React, { useState, useEffect } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';

const Modal = ({ show, onClose, record }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{record.title}</h2>
        <p>{record.content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

function App() {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    fetch('/records.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setRecords(data);
        setFilteredRecords(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (searchInput === '') {
      setFilteredRecords(records);
    } else {
      setFilteredRecords(
        records.filter(record =>
          record.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [searchInput, records]);

  const handleItemClick = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  return (
    <div className="App">
      <div className="Search-bar">
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} records={records} />
      </div>

      <header className="App-header">
        <h1>....Fairy Tales....</h1>
        <div>
          <ol>
            {filteredRecords.length > 0 ? filteredRecords.map(record => (
              <li key={record.id} onClick={() => handleItemClick(record)} className="list-item">
                <strong>{record.title}</strong>
              </li>
            )) : <p>No data available</p>}
          </ol>
        </div>
      </header>

      <Modal show={showModal} onClose={handleCloseModal} record={selectedRecord} />
    </div>
  );
}

export default App;
