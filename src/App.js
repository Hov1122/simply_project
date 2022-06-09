import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import Login from './components/auth/Login';
import RequireAuth from './components/auth/RequireAuth';
import HomePage from "./components/homePage";
import Menu from './components/menu/menu';
import Schedule from './components/schedule/schedule';
import Tests from './components/tests/tests';
import NotFound from './components/notFound/NotFound';
import Header from './components/header/Header';
import Main from './components/main/Main';

function App() {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="App">
      <ErrorBoundary>
        <Header setShowMenu={setShowMenu}/>
        <Main>
          <Menu showMenu={showMenu}/>
          <Routes>
            (// PUBLIC ROUTES)
            <Route path='/' element={<Login />}/>

            (// PROTECTED ROUTES)
            <Route element={<RequireAuth />}>
              <Route path='/home' element={<HomePage />}/>

              <Route path='/schedule' element={<Schedule />}/>

              <Route path='/tests' element={<Tests />}/>
            </Route>

            (// NOT FOUND ROUTE)
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Main>
      </ErrorBoundary>
    </div>
  );
}

export default App;
