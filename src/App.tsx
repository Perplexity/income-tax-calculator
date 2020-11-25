import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Calculator from './features/calculator/Calculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator/>
      </header>
    </div>
  );
}

export default App;
