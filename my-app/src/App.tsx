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
import WordsContainer from './components/textbook/WordsContainer';
import PartOfTextBook from './components/textbook/PartOfTextbook';
import SignInForm from './components/autorisation/SignInForm';
import RegForm from './components/autorisation/RegisterForm';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <PersistentDrawerRight />
          <div id="mainContainer">
             <Routes>
                <Route path={APP_ROUTES.MAIN} element={<Landing/>}/>
                <Route path='*' element={<Landing/>}/>
                <Route path={APP_ROUTES.SIGNIN} element={<SignInForm/>}/>
                <Route path={APP_ROUTES.REGFORM} element={<RegForm/>}/>
                <Route path={APP_ROUTES.TEXTBOOK} element={<Textbook/>}/>
                
                <Route path={`${APP_ROUTES.TEXTBOOK}/:part`} element={<Textbook />} />
                <Route path={`${APP_ROUTES.TEXTBOOK}/:part/:page`} element={<Textbook />}/>
                
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
