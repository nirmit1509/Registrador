import React from 'react';
import '../css/App.css';
import Left from './Left';
import Right from './Right';

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Left />
        <Right /> 
      </div>
    </div>
  );
}

export default App;