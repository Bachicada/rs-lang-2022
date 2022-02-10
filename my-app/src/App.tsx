import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PersistentDrawerRight } from './components/shared/Appnav';
import { Footer } from './components/shared/Footer';
import Landing from './components/start-page/Landing';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import {APP_ROUTES} from './utils/Constants';
import Textbook from './components/textbook/Textbook';
import Sprint from './components/sprint/Sprint';
import Audiocall from './components/audiocall/Audiocall';
import Stat from './components/statistics/Stat';
import SignInForm from './components/autorisation/SignIn-Form';
import RegForm from './components/autorisation/RegisterForm';
import WordsContainer from './components/textbook/WordsContainer';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <PersistentDrawerRight />
          <div id="mainContainer">
             <Routes>
                <Route path={APP_ROUTES.MAIN} element={<Landing/>}/>
                <Route path='*' element={<Landing/>}/>
                <Route path={APP_ROUTES.TEXTBOOK} element={<Textbook/>}/>
               
                <Route path={`${APP_ROUTES.MAIN}${APP_ROUTES.TEXTBOOK}/part1/page1`} element={<WordsContainer page='1' part='1'/>} /> 
               
                <Route path={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART2}`} element={<div>part 2</div>} /> 
                <Route path={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART3}`} element={<div>part 3</div>} /> 
                <Route path={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART4}`} element={<div>part 4</div>} /> 
                <Route path={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART5}`} element={<div>part 5</div>} /> 
                <Route path={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART6}`} element={<div>part 6</div>} /> 
                <Route path={APP_ROUTES.SPRINT} element={<Sprint/>} />
                <Route path={APP_ROUTES.AUDIOCALL} element={<Audiocall/>} />
                <Route path={APP_ROUTES.STATISTICS} element={<Stat/>} />
             </Routes>   
          </div>
         <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
