import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import Login from './components/auth/Login';
import LogOut from './components/auth/LogOut';
import RequireAuth from './components/auth/RequireAuth';
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          // PUBLIC ROUTES
          <Route path='/' element={<Login />}/>
          <Route path='/logout' element={<LogOut />}/>

          // PROTECTED ROUTES
          <Route element={<RequireAuth />}>
            <Route path='/home' element={<HomePage />}/>
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
