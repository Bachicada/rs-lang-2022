import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PersistentDrawerRight } from './components/start-page/Appnav';
import { Footer } from './components/start-page/Footer';
import Landing from './components/start-page/Landing';

function App() {
  return (
    <div className="App">
      <PersistentDrawerRight/>
      <div id='mainContainer'>
        <Landing/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
