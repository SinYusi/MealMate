import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Routes/Login'
import Home from './Routes/Home'
import AddRestaurant from './Routes/AddRestaurant'
import Navigationbar from './components/Navigationbar';
import SignUp from './Routes/SignUp';
import Restaurant from './Routes/Restaurant';
import Board from './Routes/Board';
import DetailRestaurant from './Routes/DetailRestaurant';

function App() {
  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addrestaurant' element={<AddRestaurant />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/restaurant' element={<Restaurant />} />
        <Route path='/restaurant/:id' element={<DetailRestaurant />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
