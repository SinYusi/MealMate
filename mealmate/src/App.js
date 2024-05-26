import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Routes/Login'
import Home from './Routes/Home'
import AddRestaurant from './Routes/AddRestaurant'
import Navigationbar from './components/Navigationbar';
import SignUp from './Routes/SignUp';

function App() {
  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addrestaurant' element={<AddRestaurant />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
