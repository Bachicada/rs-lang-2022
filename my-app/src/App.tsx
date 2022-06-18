import React, { useEffect, useState } from 'react';
import './App.css';
import { PersistentDrawerRight } from './components/shared/Appnav';
import { Footer } from './components/shared/Footer';
import Landing from './components/start-page/Landing';
import { Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './utils/Constants';
import Textbook from './components/textbook/Textbook';
import Sprint from './components/sprint/Sprint';
import Audiocall from './components/audiocall/Audiocall';
import Stat from './components/statistics/Stat';
import SignInForm from './components/autorisation/SignInForm';
import RegForm from './components/autorisation/RegisterForm';
import { createContext } from 'react';
import { CurUser } from './types';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

export const UserContext = createContext({
  user: {},
  dispatchUserEvent: (actionType: string, payload: CurUser) => {},
});

function App() {
  const [user, setUser] = useState<CurUser>({});

  useEffect(() => {
    dispatchUserEvent('UPDATE_USER', JSON.parse(localStorage.getItem('CurrentUser') || '{}'));
  }, []);

  const dispatchUserEvent = (actionType: string, payload: CurUser) => {
    switch (actionType) {
      case 'UPDATE_USER':
        setUser((prev: CurUser) => ({
          ...prev,
          ...(payload || {}),
        }));
        return;
      case 'CLEAR_USER':
        setUser({});
        return;
      default:
        return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, dispatchUserEvent }}>
        <div className="App">
          <PersistentDrawerRight />
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
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
