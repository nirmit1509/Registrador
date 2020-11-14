import React from 'react';
import '../css/App.css';
import ReactNotifications from 'react-notifications-component';
import Left from './Left';
import Right from './Right';

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <ReactNotifications />
        <Left />
        <Right /> 
      </div>
    </div>
  );
}

export default App;