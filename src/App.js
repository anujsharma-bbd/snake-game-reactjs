import React from 'react';
import './App.scss';
import SnakeBoardComponent from './components/snake-board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Snake Game
        <SnakeBoardComponent></SnakeBoardComponent>
      </header>
    </div>
  );
}

export default App;
