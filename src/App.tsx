import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Calculator from './features/calculator/Calculator';
import logo from './logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="igloo-logo" />
        <Calculator />
      </header>
    </div>
  );
}

export default App;
