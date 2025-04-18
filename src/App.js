import logo from './logo.svg';
import './App.css';
import Nav from "./Nav";
import React from 'react';
import Header from "./Header";
import Sections from "./Sections";

function App() {
  return (
    <div className="App">
      <Nav />
      <Header />
      <Sections />
    </div>
  );
}

export default App;
