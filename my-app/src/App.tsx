import React, { useEffect, useState } from 'react';
import './App.css';
import { PersistentDrawerRight } from './components/shared/Appnav';
import { Footer } from './components/shared/Footer';
import Landing from './components/start-page/Landing';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {APP_ROUTES} from './utils/Constants';
import Textbook from './components/textbook/Textbook';
import Sprint from './components/sprint/Sprint';
import Audiocall from './components/audiocall/Audiocall';
import Stat from './components/statistics/Stat';
import SignInForm from './components/autorisation/SignInForm';
import RegForm from './components/autorisation/RegisterForm';
import { createContext } from "react";
import { CurUser } from './types';



export const UserContext = createContext({
    user: {},
    dispatchUserEvent: (actionType: string, payload: CurUser) => {}
  });


function App() {
  const [user, setUser] = useState<CurUser>({});
  
useEffect(() => {
  dispatchUserEvent(
    "UPDATE_USER",
    JSON.parse(localStorage.getItem("CurrentUser") || "{}")
  );
}, []);

const dispatchUserEvent = (actionType: string, payload: CurUser) => {
  switch (actionType) {
    case "UPDATE_USER":
      setUser((prev: CurUser) => ({
        ...prev,
        ...(payload || {})
      }));
      return;
    case "CLEAR_USER":
      setUser({});
      return;
    default:
      return;
  }
};

const  location = useLocation();
const navigate = useNavigate();

useEffect(()=>{
  const path = localStorage.getItem('CurrentLink');
  if (path){
    const b = path;
    navigate(b);
    console.log(b)
  }
  else {
    navigate(`${APP_ROUTES.MAIN}`)
  }
},[])

useEffect(() => {

 window.addEventListener("beforeunload", ()=> localStorage.setItem('CurrentLink',location.pathname));

 return () => window.removeEventListener("beforeunload", ()=> localStorage.setItem('CurrentLink',location.pathname));
 
}, [location]);



  return (
    
      <UserContext.Provider value={{ user, dispatchUserEvent }}>
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
      </UserContext.Provider>
  
  );
}

export default App;
