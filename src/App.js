import './App.css';
import React from 'react';
import ArtContainer from './Containers/ArtContainer';

function App() {
  return (
    <div className="App">
      <header>
        <h1>The Metropolitan Museum of Art</h1>
        <h2>European Collection</h2>
      </header>
      <ArtContainer />
    </div>
  );
};

export default App;
