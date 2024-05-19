import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigationbar from './components/Navigationbar'
import Login from './Routes/Login'

function App() {
  return (
    <div className="App">
      <Navigationbar />
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
