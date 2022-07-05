import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/REFACTORING/Header/Header';
import { Footer } from './components/REFACTORING/Footer/Footer';
import Landing from './components/start-page/Landing';
import { Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './utils/Constants';
import Textbook from './components/textbook/Textbook';
import Sprint from './pages/sprint/Sprint';
import Audiocall from './pages/audiocall/Audiocall';
import Stat from './components/statistics/Stat';
import SignInForm from './components/REFACTORING/Authorisation/SignInForm';
import RegForm from './components/REFACTORING/Authorisation/RegisterForm';
import { CurUser } from './types/types';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import UserContext from './store/contexts/userContext';
import { useUserReducer } from './store/hooks';
import UserChecker from './hocs/UserChecker';

function App() {
  // const [user, setUser] = useState<CurUser>({});

  // useEffect(() => {
  //   dispatchUserEvent('UPDATE_USER', JSON.parse(localStorage.getItem('CurrentUser') || '{}'));
  // }, []);

  // https://icons8.com/illustrations/illustration/bubble-gum-head-of-boy-in-graduation-cap
  const value = useUserReducer();

  return (
    <ThemeProvider theme={theme}>
      {/* <UserContext.Provider value={{ user, dispatchUserEvent }}> */}
      <UserContext.Provider value={value}>
        <UserChecker>
          <div className="App">
            <Header />
            <div id="mainContainer">
              <Routes>
                <Route path={APP_ROUTES.MAIN} element={<Landing />} />
                <Route path={APP_ROUTES.SIGNIN} element={<SignInForm />} />
                <Route path={APP_ROUTES.REGFORM} element={<RegForm />} />
                <Route path={APP_ROUTES.TEXTBOOK} element={<Textbook />} />

                <Route path={`${APP_ROUTES.TEXTBOOK}/:part`} element={<Textbook />} />
                <Route path={`${APP_ROUTES.TEXTBOOK}/:part/:page`} element={<Textbook />} />

                <Route path={APP_ROUTES.SPRINT} element={<Sprint />} />
                <Route path={APP_ROUTES.AUDIOCALL} element={<Audiocall />} />
                <Route path={APP_ROUTES.STATISTICS} element={<Stat />} />

                <Route path="*" element={<Landing />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </UserChecker>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
