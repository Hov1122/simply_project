import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import Login from './components/auth/Login';
import LogOut from './components/auth/LogOut';
import RequireAuth from './components/auth/RequireAuth';
import HomePage from "./components/homePage";
import Menu from './components/menu/menu';
import Schedule from './components/schedule/schedule';
import Tests from './components/tests/tests';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Menu />
        <Routes>
          // PUBLIC ROUTES
          <Route path='/' element={<Login />}/>

          // PROTECTED ROUTES
          <Route element={<RequireAuth />}>
            <Route path='/home' element={<HomePage />}/>

            <Route path='schedule' element={<Schedule />}/>

            <Route path='tests' element={<Tests />}/>

            <Route path='/logout' element={<LogOut />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
