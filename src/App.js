import { Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
